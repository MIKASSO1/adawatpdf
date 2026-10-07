'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter, routing, type Locale, localeLabels } from '@/lib/i18n/routing';
import { setStoredLocale } from '@/lib/i18n/detect';
import { Languages, Check, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const { locales } = routing;

  const switchLocale = (newLocale: Locale) => {
    setStoredLocale(newLocale);
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <>
      {/* Desktop dropdown */}
      <div className="hidden sm:block">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2 font-medium">
              <Languages className="h-4 w-4" />
              <span className="max-w-[100px] truncate">{localeLabels[locale].flag} {localeLabels[locale].label}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            {locales.map((l) => (
              <DropdownMenuItem
                key={l}
                onClick={() => switchLocale(l)}
                className="flex items-center justify-between gap-3 cursor-pointer"
              >
                <span className="flex items-center gap-2.5">
                  <span className="text-base">{localeLabels[l].flag}</span>
                  <span>{localeLabels[l].label}</span>
                </span>
                {l === locale && <Check className="h-4 w-4 text-primary" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile sheet */}
      <div className="sm:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Language">
              <Globe className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-auto max-h-[70vh]">
            <SheetHeader className="pb-4">
              <SheetTitle className="text-center">
                <span className="flex items-center justify-center gap-2">
                  <Languages className="h-5 w-5 text-primary" />
                  Select Language
                </span>
              </SheetTitle>
            </SheetHeader>
            <div className="grid grid-cols-2 gap-2 overflow-y-auto pb-6">
              {locales.map((l) => (
                <button
                  key={l}
                  onClick={() => switchLocale(l)}
                  className={`flex items-center gap-2.5 rounded-xl border px-3 py-3 text-sm font-medium transition-colors ${
                    l === locale
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border text-muted-foreground hover:bg-accent'
                  }`}
                >
                  <span className="text-lg">{localeLabels[l].flag}</span>
                  <span className="truncate">{localeLabels[l].label}</span>
                  {l === locale && <Check className="ml-auto h-4 w-4 shrink-0 text-primary" />}
                </button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
