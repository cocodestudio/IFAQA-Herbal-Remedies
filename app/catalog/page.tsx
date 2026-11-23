'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getRemedies, getCategories, filterRemedies } from '@/lib/remedies-service';
import { HerbalRemedy, AilmentCategory } from '@/lib/types';
import { RemedyCard3D } from '@/components/catalog/RemedyCard3D';
import { SearchBar } from '@/components/catalog/SearchBar';
import { FilterSidebar } from '@/components/catalog/FilterSidebar';
import { ArchitecturalBadge } from '@/components/ui/ArchitecturalBadge';
import { CatalogSkeletonGrid } from '@/components/ui/ShimmerSkeleton';
import { useLanguage } from '@/context/LanguageContext';
import { SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';

const ITEMS_PER_PAGE = 9;

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [remedies, setRemedies] = useState<HerbalRemedy[]>([]);
  const [categories, setCategories] = useState<AilmentCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { t, getCategoryTitle } = useLanguage();

  // Filter states
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedForm, setSelectedForm] = useState('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const [r, c] = await Promise.all([getRemedies(), getCategories()]);
      setRemedies(r);
      setCategories(c);
      setLoading(false);
    }
    load();
  }, []);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, search, inStockOnly, selectedForm]);

  const filteredRemedies = useMemo(() => {
    return filterRemedies(remedies, {
      category: selectedCategory,
      search,
      inStockOnly,
      form: selectedForm,
    });
  }, [remedies, selectedCategory, search, inStockOnly, selectedForm]);

  const totalPages = Math.max(1, Math.ceil(filteredRemedies.length / ITEMS_PER_PAGE));

  const paginatedRemedies = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredRemedies.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredRemedies, currentPage]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    if (typeof window !== 'undefined') {
      const gridElem = document.getElementById('catalog-grid-top');
      if (gridElem) {
        gridElem.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 180, behavior: 'smooth' });
      }
    }
  };

  const activeCategoryObj = categories.find(
    c => c.slug === selectedCategory || c.id === selectedCategory
  );

  const displayCategoryTitle = activeCategoryObj
    ? getCategoryTitle(activeCategoryObj)
    : t('allFormulations');

  return (
    <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-8 md:py-12 overflow-x-hidden select-none">
      {/* Header Banner - Full Width */}
      <div className="mb-8 border-b border-ifaqa-sand/60 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <ArchitecturalBadge variant="notched">Dispensary Pharmacopoeia</ArchitecturalBadge>
          {activeCategoryObj && (
            <ArchitecturalBadge variant="chamfer">{activeCategoryObj.romanName || activeCategoryObj.id}</ArchitecturalBadge>
          )}
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ifaqa-plum">
          {displayCategoryTitle}
        </h1>
        <p className="text-xs sm:text-sm text-ifaqa-blackberry font-sans mt-2 max-w-3xl leading-relaxed font-medium">
          {activeCategoryObj
            ? activeCategoryObj.description
            : "Explore our canonical collection of pure herbal compounds, electuaries, and botanical preparations formulated strictly according to traditional standards."}
        </p>
      </div>

      {/* Search & Mobile Filter Toggle */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="w-full sm:max-w-lg">
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="lg:hidden w-full sm:w-auto px-4 py-2.5 bg-white border border-ifaqa-sand text-ifaqa-plum text-xs font-serif font-bold flex items-center justify-center gap-2 shadow-sm"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>{showMobileFilters ? "Hide Filters" : t('filter')}</span>
        </button>
      </div>

      {/* Main Layout: Sidebar + Grid */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
        {/* Sidebar */}
        <div className={`w-full lg:w-72 shrink-0 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
          <FilterSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            selectedForm={selectedForm}
            onSelectForm={setSelectedForm}
            inStockOnly={inStockOnly}
            onToggleInStock={setInStockOnly}
            totalResultsCount={filteredRemedies.length}
          />
        </div>

        {/* Catalog Grid Area */}
        <div id="catalog-grid-top" className="flex-1 w-full min-w-0">
          {loading ? (
            <CatalogSkeletonGrid count={ITEMS_PER_PAGE} />
          ) : filteredRemedies.length === 0 ? (
            /* Bespoke Luxury Empty State */
            <div className="p-12 text-center bg-white border border-ifaqa-sand/60 space-y-4 shadow-sm my-6">
              <div className="w-16 h-16 mx-auto bg-ifaqa-linen flex items-center justify-center text-3xl border border-ifaqa-sand/40">
                🌿
              </div>
              <h3 className="font-serif text-xl font-bold text-ifaqa-plum">
                No Classical Remedies Found
              </h3>
              <p className="text-xs sm:text-sm text-ifaqa-blackberry font-sans max-w-md mx-auto leading-relaxed font-medium">
                Our compounding specialists are preparing new batches. Try adjusting your search query or filter.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedForm('all');
                    setSearch('');
                    setInStockOnly(false);
                  }}
                  className="px-6 py-2.5 bg-ifaqa-plum text-ifaqa-linen text-xs font-serif font-bold uppercase tracking-widest hover:bg-ifaqa-blackberry transition-colors"
                >
                  Browse All Categories
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Results status header */}
              <div className="text-xs font-mono text-ifaqa-blackberry font-semibold mb-4 flex items-center justify-between">
                <span>
                  Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filteredRemedies.length)} of {filteredRemedies.length} authentic {filteredRemedies.length === 1 ? 'product' : 'products'}
                </span>
                {selectedCategory !== 'all' && (
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className="text-ifaqa-plum underline hover:text-ifaqa-blackberry font-serif font-bold"
                  >
                    Clear category filter
                  </button>
                )}
              </div>

              {/* Responsive Grid with equal card heights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 auto-rows-fr">
                {paginatedRemedies.map((remedy) => (
                  <RemedyCard3D key={remedy.id} remedy={remedy} />
                ))}
              </div>

              {/* Luxury Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-10 pt-6 border-t border-ifaqa-sand/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs font-mono text-ifaqa-blackberry font-medium">
                    Page {currentPage} of {totalPages} ({filteredRemedies.length} total products)
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3.5 py-1.5 text-xs font-serif font-bold uppercase tracking-wider border border-ifaqa-sand/60 bg-white hover:bg-ifaqa-sand/20 text-ifaqa-plum disabled:opacity-40 disabled:cursor-not-allowed shadow-sm transition-colors flex items-center gap-1"
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>Prev</span>
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        aria-label={`Go to page ${page}`}
                        aria-current={currentPage === page ? 'page' : undefined}
                        className={`w-8 h-8 text-xs font-mono font-bold flex items-center justify-center border transition-all ${
                          currentPage === page
                            ? 'bg-[#0B2D22] text-[#DFBA73] border-[#0B2D22] shadow-md font-extrabold'
                            : 'bg-white text-ifaqa-plum border-ifaqa-sand/60 hover:bg-ifaqa-sand/20'
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3.5 py-1.5 text-xs font-serif font-bold uppercase tracking-wider border border-ifaqa-sand/60 bg-white hover:bg-ifaqa-sand/20 text-ifaqa-plum disabled:opacity-40 disabled:cursor-not-allowed shadow-sm transition-colors flex items-center gap-1"
                      aria-label="Next page"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<CatalogSkeletonGrid count={9} />}>
      <CatalogContent />
    </Suspense>
  );
}
