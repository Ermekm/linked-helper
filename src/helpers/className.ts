type Mods = Record<string, boolean | string>

// The classNames function generates a string of combined CSS class names, incorporating a base class, 
// optional modifiers, and additional classes, while filtering out falsy values.
export function classNames(cls: string, mods: Mods = {}, additional: string[] = []): string {
    return [
        cls,
        ...additional.filter(Boolean),
        ...Object.entries(mods)
            .filter(([_, value]) => Boolean(value))
            .map(([className]) => className),
    ]
        .join(' ');
}
