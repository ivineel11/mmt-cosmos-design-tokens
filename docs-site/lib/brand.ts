/** Where the brand switcher remembers the reader's brand. */
export const BRAND_STORAGE_KEY = "cosmos-brand";

/** Runs before first paint (app/layout.tsx) so a stored brand never flashes the default. */
export const brandBootScript = `try{var b=localStorage.getItem(${JSON.stringify(BRAND_STORAGE_KEY)});if(b)document.documentElement.dataset.brand=b}catch(e){}`;
