import { Page } from "@playwright/test";
import HomePage from "../../models/pages/HomePage";
import FooterComponent from "../../models/components/global/footer/FooterComponent";
import FooterColumnComponent from "../../models/components/global/footer/FooterColumnComponent";
import assert from 'assert'; 
import deepStrictEqual from 'assert'; 
import InformationColumnComponent from "../../models/components/global/footer/InformationColumnComponent";

export default class FooterTestFlow{
    constructor(private page: Page){
        this.page = page;
    }

    //Service method
    async verifyFooterComponent():Promise <void>{
        const homePage: HomePage = new HomePage(this.page);
        const footerComponent: FooterComponent = homePage.footerComponent();
        await this.verifyInformationColumn(footerComponent);
        this.verifyCustomerServiceColumn(footerComponent);
        this.verifyMyAccountColumn(footerComponent);
        this.verifyFollowUsColumn(footerComponent); 
    }

    //Support method
    private async verifyInformationColumn(footerComponent: FooterComponent):Promise <void>{
       const informationColumnComp: InformationColumnComponent = footerComponent.informationColumnComponent();
    //    const title = await inform ationColumnComp.title().textContent(); 
        await this.verifyFooterColumn(informationColumnComp, [], []);
    //    console.log(`title: ${ti tle}`);
    }
    private verifyCustomerServiceColumn(footerComponent: FooterComponent):void{

    }
    private verifyMyAccountColumn(footerComponent: FooterComponent):void{

    }
    
    private verifyFollowUsColumn(footerComponent: FooterComponent ):void{

    }
    private async verifyFooterColumn(
        footerColumnComp: FooterColumnComponent,
        expectedLinkTexts: string[],
        expectedHrefs: string[]
    ): Promise<void>   {
            const actualLinkTexts: string[] = [];
            const actualHrefs: string[] = [];
            const footerComponentLinks = await footerColumnComp.links();
            for (const footerComponentLink of footerComponentLinks) {
                const footerLinkText = await footerComponentLink.textContent();
                const footerLinkHref = await footerComponentLink.getAttribute('href');
                actualLinkTexts.push(footerLinkText);
                actualHrefs.push(footerLinkHref);
            }
            deepStrictEqual(actualLinkTexts,expectedLinkTexts,
                `Actual link texts and expected link texts is not the same. 
                Actual: ${actualLinkTexts}, 
                Expected: ${expectedLinkTexts}`
            );
            deepStrictEqual(actualHrefs,expectedHrefs,
                `Actual link texts and expected link texts is not the same. 
                Actual: ${actualHrefs}, 
                Expected: ${expectedHrefs }`
            );

    }
}