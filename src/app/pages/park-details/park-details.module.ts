import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";
import {ParkDetailsPage} from './park-details.page';
import {ParkDetailsRouttingModule} from './park-details-routting.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ParkDetailsRouttingModule,
    ],
    declarations: [ParkDetailsPage]
})
export class ParkDetailsModule {}
