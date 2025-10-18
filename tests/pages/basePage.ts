import { Page } from '@playwright/test';
import Actions from './actions';

export default class BasePage{
    protected readonly page:Page;
    public readonly actions;
    constructor(page:Page){
        this.page = page;
        this.actions = new Actions(page);
    }
}