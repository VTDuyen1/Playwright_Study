import {test} from '@playwright/test';
import ComputerDetailsPage from '../../models/pages/ComputerDetailsPage';
import ChipComputerComponent from '../../models/components/computer/ChipComputerComponent';
import ComputerEssentialComponent from '../../models/components/computer/ComputerEssentialComponent';
import StandardComputerComponent from '../../models/components/computer/StandardComputerComponent';

test('Test Base Component In Page', async ({page}) =>{
    const computerDetailsPage: ComputerDetailsPage = new ComputerDetailsPage(page);
    // computerDetailsPage.computerComp(ChipComputerComponent); 
    const cheapComputerComp: ComputerEssentialComponent = computerDetailsPage.computerComp(ChipComputerComponent);
    const standardComputerComp: StandardComputerComponent = computerDetailsPage.computerComp(StandardComputerComponent);
    
    await cheapComputerComp.selectProcessorType("abcde");
    await standardComputerComp.selectProcessorType("sdfaf");
})