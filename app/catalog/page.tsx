'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import seedData from '@/lib/seed-data.json';
import { getRemedies, getCategories, filterRemedies } from '@/lib/remedies-service';
import { HerbalRemedy, AilmentCategory } from '@/lib/types';
import { RemedyCard3D } from '@/components/catalog/RemedyCard3D';
import { SearchBar } from '@/components/catalog/SearchBar';
import { FilterSidebar } from '@/components/catalog/FilterSidebar';
import { CatalogSkeletonGrid } from '@/components/ui/ShimmerSkeleton';
import { useLanguage } from '@/context/LanguageContext';
import { SlidersHorizontal, ChevronLeft, ChevronRight, Leaf } from 'lucide-react';

const ITEMS_PER_PAGE = 9;

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  // Instant initial hydration from local seedData — avoids blocking on remote network fetches
  const [remedies, setRemedies] = useState<HerbalRemedy[]>(() => seedData.remedies as unknown as HerbalRemedy[]);
  const [categories, setCategories] = useState<AilmentCategory[]>(() => seedData.categories as unknown as AilmentCategory[]);
  const [currentPage, setCurrentPage] = useState(1);
  const { t, getCategoryTitle } = useLanguage();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedForm, setSelectedForm] = useState('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    async function refreshInBackground() {
      const [r, c] = await Promise.all([getRemedies(), getCategories()]);
      if (r && r.length > 0) setRemedies(r);
      if (c && c.length > 0) setCategories(c);
    }
    refreshInBackground();
  }, []);

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
        window.scrollTo({ top: 120, behavior: 'smooth' });
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
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-8 md:py-12 select-none">
      {/* Page Header */}
      <div className="mb-8 border-b border-ifaqa-plum/10 pb-6 space-y-2">
        <p className="text-xs font-sans text-[#5A6962]">
          {t('genuineQuality')}
        </p>
        <h1 className="font-serif font-normal text-3xl sm:text-4xl text-ifaqa-plum">
          {displayCategoryTitle}
        </h1>
        <p className="text-sm text-[#3E524A] font-sans max-w-2xl leading-relaxed">
          {activeCategoryObj
            ? activeCategoryObj.description
            : 'Browse Unani and Ayurvedic powders, electuaries, syrups, and botanical oils crafted cleanly in Saharanpur.'}
        </p>
      </div>

      {/* Search & Mobile Filter Toggle */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
        <div className="w-full sm:max-w-md">
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="lg:hidden h-10 px-4 rounded-lg bg-white border border-ifaqa-plum/15 text-ifaqa-plum text-sm font-sans font-medium inline-flex items-center justify-center gap-2"
        >
          <SlidersHorizontal className="w-4 h-4 text-[#5A6962]" strokeWidth={1.5} />
          <span>{showMobileFilters ? 'Hide filters' : t('filter')}</span>
        </button>
      </div>

      {/* Main Layout: 260px Sidebar + Grid */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className={`w-full lg:w-[260px] shrink-0 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
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

        <div id="catalog-grid-top" className="flex-1 w-full min-w-0">
          {filteredRemedies.length === 0 ? (
            <div className="p-10 text-center bg-white rounded-xl border border-ifaqa-plum/10 space-y-4">
              <div className="w-12 h-12 rounded-xl mx-auto bg-ifaqa-cashmere flex items-center justify-center text-[#5A6962]">
                <Leaf className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <h3 className="font-sans text-lg font-semibold text-ifaqa-plum">
                No remedies match your filter
              </h3>
              <p className="text-sm text-[#5A6962] font-sans max-w-md mx-auto">
                Try clearing the search query or selecting another health category.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedForm('all');
                  setSearch('');
                  setInStockOnly(false);
                }}
                className="h-10 px-5 rounded-lg bg-ifaqa-plum text-ifaqa-linen text-sm font-sans font-medium hover:bg-ifaqa-blackberry transition-colors"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div>
              <div className="text-xs font-mono text-[#5A6962] mb-4 flex items-center justify-between gap-2 tabular-nums">
                <span>
                  Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filteredRemedies.length)} of {filteredRemedies.length} products
                </span>
                {selectedCategory !== 'all' && (
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className="text-xs font-sans font-medium text-ifaqa-plum hover:underline"
                  >
                    Clear category
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr">
                {paginatedRemedies.map((remedy) => (
                  <RemedyCard3D key={remedy.id} remedy={remedy} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-10 pt-6 border-t border-ifaqa-plum/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs font-mono text-[#5A6962] tabular-nums">
                    Page {currentPage} of {totalPages}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="h-9 px-3 rounded-lg text-xs font-sans font-medium border border-ifaqa-plum/15 bg-white hover:bg-ifaqa-cashmere text-ifaqa-plum disabled:opacity-40 disabled:cursor-not-allowed transition-colors inline-flex items-center gap-1"
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="w-4 h-4 rtl-flip" strokeWidth={1.5} />
                      <span>Prev</span>
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        aria-label={`Go to page ${page}`}
                        aria-current={currentPage === page ? 'page' : undefined}
                        className={`w-9 h-9 rounded-lg text-xs font-mono font-medium flex items-center justify-center border transition-colors tabular-nums ${
                          currentPage === page
                            ? 'bg-ifaqa-plum text-ifaqa-linen border-ifaqa-plum'
                            : 'bg-white text-ifaqa-plum border-ifaqa-plum/15 hover:bg-ifaqa-cashmere'
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="h-9 px-3 rounded-lg text-xs font-sans font-medium border border-ifaqa-plum/15 bg-white hover:bg-ifaqa-cashmere text-ifaqa-plum disabled:opacity-40 disabled:cursor-not-allowed transition-colors inline-flex items-center gap-1"
                      aria-label="Next page"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-4 h-4 rtl-flip" strokeWidth={1.5} />
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
    <Suspense fallback={<div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-10"><CatalogSkeletonGrid count={9} /></div>}>
      <CatalogContent />
    </Suspense>
  );
}
