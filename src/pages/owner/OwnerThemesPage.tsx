import React, { useState } from 'react';
import { THEME_REGISTRY } from '../../data/themes';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Layout, Type } from 'lucide-react';

export const OwnerThemesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [search, setSearch] = useState('');

  const themes = THEME_REGISTRY;

  const filteredThemes = themes.filter((t) => {
    const cats = t.categoryCompatibilities?.join(' ') || t.category || '';
    const matchesCat = selectedCategory === 'all' || cats.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Global Theme Registry (24 Industry Editions)
        </h1>
        <p className="text-xs text-slate-500">
          Engineered design systems complete with bespoke palettes, mathematical typography scales, and tailored section defaults.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredThemes.map((theme) => (
          <Card key={theme.id} variant="bordered" padding="none" className="overflow-hidden flex flex-col justify-between">
            <div>
              {/* Theme Palette Bar */}
              <div className="h-16 flex items-stretch">
                <div className="flex-1" style={{ backgroundColor: theme.defaultPalette.primary }} />
                <div className="flex-1" style={{ backgroundColor: theme.defaultPalette.secondary }} />
                <div className="flex-1" style={{ backgroundColor: theme.defaultPalette.accent }} />
                <div className="flex-1" style={{ backgroundColor: theme.defaultPalette.surface }} />
                <div className="flex-1" style={{ backgroundColor: theme.defaultPalette.bg }} />
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    {theme.categoryCompatibilities?.[0] || theme.category || 'All Categories'}
                  </span>
                  <Badge variant="gold" size="sm">
                    {theme.id.replace('theme_', '')}
                  </Badge>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white">{theme.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{theme.description}</p>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1 text-[11px] text-slate-500">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1"><Type className="w-3 h-3" /> Heading Font:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{theme.typography.headingFont}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1"><Layout className="w-3 h-3" /> Layout Density:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200 capitalize">{theme.layout.spacingDensity || 'comfortable'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
              <span>Ready for Website Studio</span>
              <span className="text-emerald-600 font-bold">✓ Active</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
