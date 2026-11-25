'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import seedData from '@/lib/seed-data.json';
import { getRemedies, getCategories, filterRemedies } from '@/lib/remedies-service';
import { HerbalRemedy, AilmentCategory } from '@/lib/types';
import { RemedyCard3D } from '@/components/catalog/RemedyCard3D';
import { SearchBar } from '@/components/catalog/SearchBar';
import { FilterSidebar } from '@/components/catalog/FilterSidebar';
import { useLanguage } from '@/context/LanguageContext';
import { SlidersHorizontal, ChevronLeft, ChevronRight, ArrowLeft, Leaf } from 'lucide-react';

const VALID_CATEGORIES = ['hazim', 'muqawwi', 'sual', 'mafasil', 'jild', 'quwwat-e-mudafiat'];
const ITEMS_PER_PAGE = 9;

export default function CategoryCatalogPage() {
  const params = useParams();
  const categoryParam = typeof params?.category === 'string' ? params.category.toLowerCase().trim() : '';

  const isInvalidCategory = Boolean(categoryParam && !VALID_CATEGORIES.includes(categoryParam));

  const [remedies, setRemedies] = useState<HerbalRemedy[]>(() => seedData.remedies as unknown as HerbalRemedy[]);
  const [categories, setCategories] = useState<AilmentCategory[]>(() => seedData.categories as unknown as AilmentCategory[]);
  const [currentPage, setCurrentPage] = useState(1);
  const { t, getCategoryTitle } = useLanguage();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedForm, setSelectedForm] = useState('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    async function refresh() {
      const [r, c] = await Promise.all([getRemedies(), getCategories()]);
      if (r && r.length > 0) setRemedies(r);
      if (c && c.length > 0) setCategories(c);
    }
    refresh();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, search, inStockOnly, selectedForm]);

  const activeCategory = categories.find(
    c => c.slug === categoryParam || c.id === categoryParam
  );

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
      const gridElem = document.getElementById('category-grid-top');
      if (gridElem) {
        const y = gridElem.getBoundingClientRect().top + window.scrollY - 88;
        window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const displayTitle = activeCategory
    ? getCategoryTitle(activeCategory)
    : `${categoryParam} remedies`;

  if (isInvalidCategory) {
    return (
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-16 text-center space-y-4 select-none">
        <p className="text-xs font-sans text-[#5A6962]">{t('catalog')}</p>
        <h1 className="font-serif font-normal text-3xl text-ifaqa-plum">Category not found</h1>
        <p className="text-sm text-[#5A6962] max-w-md mx-auto">
          This health category is not listed in our catalog.
        </p>
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 h-10 px-5 rounded-lg bg-ifaqa-plum text-ifaqa-linen text-sm font-sans font-medium hover:bg-ifaqa-blackberry transition-colors"
        >
          View all remedies
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-6 md:py-8 select-none">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-xs font-sans text-[#5A6962]">
        <Link href="/" className="hover:text-ifaqa-plum transition-colors">{t('home')}</Link>
        <span aria-hidden="true">/</span>
        <Link href="/catalog" className="hover:text-ifaqa-plum transition-colors">{t('catalog')}</Link>
        <span aria-hidden="true">/</span>
        <span className="text-ifaqa-plum font-medium">{displayTitle}</span>
      </nav>

      {/* Category Header */}
      <div className="mb-5 border-b border-ifaqa-plum/10 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <h1 className="font-serif font-normal text-3xl sm:text-4xl text-ifaqa-plum">
            {displayTitle}
          </h1>
          <Link
            href="/catalog"
            className="text-sm font-sans font-medium text-ifaqa-plum hover:underline inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4 rtl-flip" strokeWidth={1.5} />
            <span>All categories</span>
          </Link>
        </div>
        {activeCategory?.description && (
          <p className="text-sm text-[#3E524A] font-sans mt-1.5 max-w-2xl leading-relaxed">
            {activeCategory.description}
          </p>
        )}
      </div>

      {/* Search & Mobile Filter Toggle */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-5">
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

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className={`w-full lg:w-[260px] shrink-0 lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto no-scrollbar ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
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

        <div id="category-grid-top" className="flex-1 w-full min-w-0">
          {filteredRemedies.length === 0 ? (
            <div className="p-10 text-center bg-white rounded-xl border border-ifaqa-plum/10 space-y-4">
              <div className="w-12 h-12 rounded-xl mx-auto bg-ifaqa-cashmere flex items-center justify-center text-[#5A6962]">
                <Leaf className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <h3 className="font-sans text-lg font-semibold text-ifaqa-plum">
                No remedies found in this category
              </h3>
              <Link
                href="/catalog"
                className="inline-flex items-center h-10 px-5 rounded-lg bg-ifaqa-plum text-ifaqa-linen text-sm font-sans font-medium hover:bg-ifaqa-blackberry transition-colors"
              >
                Browse all products
              </Link>
            </div>
          ) : (
            <div>
              <div className="text-xs font-mono text-[#5A6962] mb-4 flex items-center justify-between gap-2 tabular-nums">
                <span>
                  Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filteredRemedies.length)} of {filteredRemedies.length} products
                </span>
                <Link href="/catalog" className="text-xs font-sans font-medium text-ifaqa-plum hover:underline">
                  View all
                </Link>
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
                        className={`w-9 h-9 rounded-lg text-xs font-mono font-medium flex items-center justify-center border transition-colors tabular-nums ${currentPage === page
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
