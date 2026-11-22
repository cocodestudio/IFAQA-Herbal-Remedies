'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getRemedies, getCategories, filterRemedies } from '@/lib/remedies-service';
import { HerbalRemedy, AilmentCategory } from '@/lib/types';
import { RemedyCard3D } from '@/components/catalog/RemedyCard3D';
import { SearchBar } from '@/components/catalog/SearchBar';
import { FilterSidebar } from '@/components/catalog/FilterSidebar';
import { ArchitecturalBadge } from '@/components/ui/ArchitecturalBadge';
import { useLanguage } from '@/context/LanguageContext';
import { SlidersHorizontal, RefreshCw } from 'lucide-react';

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [remedies, setRemedies] = useState<HerbalRemedy[]>([]);
  const [categories, setCategories] = useState<AilmentCategory[]>([]);
  const [loading, setLoading] = useState(true);
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

  const filteredRemedies = useMemo(() => {
    return filterRemedies(remedies, {
      category: selectedCategory,
      search,
      inStockOnly,
      form: selectedForm,
    });
  }, [remedies, selectedCategory, search, inStockOnly, selectedForm]);

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
            : "Explore our canonical collection of electuaries, distillates, and herbal compounds compounded according to ancient Greco-Arab and South Asian canons."}
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
        <div className="flex-1 w-full min-w-0">
          {loading ? (
            <div className="h-64 flex items-center justify-center text-ifaqa-blackberry font-serif text-sm font-medium">
              <RefreshCw className="w-5 h-5 animate-spin mr-2 text-ifaqa-plum" />
              Loading classical formulations...
            </div>
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
                Our compounding specialists are preparing new batches. Try adjusting your botanical query or ailment filter.
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
              <div className="text-xs font-mono text-ifaqa-blackberry font-semibold mb-4 flex items-center justify-between">
                <span>Displaying {filteredRemedies.length} authentic {filteredRemedies.length === 1 ? 'formulation' : 'formulations'}</span>
                {selectedCategory !== 'all' && (
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className="text-ifaqa-plum underline hover:text-ifaqa-blackberry font-serif font-bold"
                  >
                    Clear category filter
                  </button>
                )}
              </div>

              {/* Responsive Grid - Fills Full Width */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
                {filteredRemedies.map((remedy) => (
                  <RemedyCard3D key={remedy.id} remedy={remedy} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-[1720px] mx-auto px-4 py-16 text-center text-ifaqa-blackberry font-serif text-sm font-medium">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-ifaqa-plum" />
          <span>Opening Classical Pharmacopoeia...</span>
        </div>
      }
    >
      <CatalogContent />
    </Suspense>
  );
}
