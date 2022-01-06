export enum taskStatuses 
{
    "To do" = 1,
    "In progress" = 2,
    "In review" = 3,
    "Compleated" = 4
}

export enum userTaskRole
{
    "Worker" = 1,
    "Support" = 2,
    "Reviewer" = 3,
}

export function enumValues(e: Object): any[]
{
    const mas = Object.values(e);
    return mas.splice(mas.length/2, mas.length);
}
