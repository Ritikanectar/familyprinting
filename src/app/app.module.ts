import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import {ColorPickerModule} from 'ngx-color-picker';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { PublicComponent } from './public/public.component';
import { LoginComponent } from './public/login/login.component';
import { HomeComponent } from './public/home/home.component';
import { AdminComponent } from './admin/admin.component';
import {AdminHomeComponent} from './admin/home/home.component';
import { EventComponent } from './admin/event/event.component';
import { CreateEventComponent } from './admin/event/create-event/create-event.component';
import { UserComponent } from './admin/user/user.component';
import { CreateUserComponent } from './admin/user/create-user/create-user.component';
import { NewAppComponent } from './admin/new-app/new-app.component';
import { RegistrationComponent } from './public/registration/registration.component';
import { ProductComponent } from './admin/product/product.component';
import { CreateProductComponent } from './admin/product/create-product/create-product.component';
import { AppListComponent } from './admin/new-app/app-list/app-list.component';
import { ProductPublicComponent } from './public/product/ProductPublicComponent';
import { ArtworkComponent } from './admin/artwork/artwork.component';
import { GalleryComponent } from './admin/gallery/gallery.component';
import { CreateGalleryComponent } from './admin/gallery/create-gallery/create-gallery.component';
import { CreateArtworkComponent } from './admin/artwork/create-artwork/create-artwork.component';
import { AssignGalleryComponent } from './admin/gallery/assign-gallery/assign-gallery.component';
import {NgbModule,NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { PrintingComponent } from './public/printing/printing.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularDraggableModule } from 'angular2-draggable';
import { ConfirmOrderComponent } from './public/confirm-order/confirm-order.component';
import { ThankYouComponent } from './public/thank-you/thank-you.component';
import { PrintModerationComponent } from './admin/print-moderation/print-moderation.component';
import { MatSliderModule } from '@angular/material/slider';
import { LandingComponent } from './public/landing/landing.component';
import { SizesComponent } from './public/product/sizes/sizes.component';
import { ColoursComponent } from './public/product/colours/colours.component';
//import { MatSidenavModule  } from '@angular/material/sidenav';
// import { MatButtonModule} from '@angular/material/button';
// import { MatSidenavModule } from '@angular/material/sidenav';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatListModule } from '@angular/material/list';
// import { MatIconModule } from '@angular/material/icon';
import { PinchZoomModule } from 'ngx-pinch-zoom';


@NgModule({
  declarations: [
    AppComponent,
    PublicComponent,
    LoginComponent,
    HomeComponent,
    AdminComponent,
    AdminHomeComponent,
    EventComponent,
    CreateEventComponent,
    UserComponent,
    CreateUserComponent,
    NewAppComponent,
    RegistrationComponent,
    ProductComponent,
    CreateProductComponent,
    AppListComponent,
    ProductPublicComponent,
    ArtworkComponent,
    GalleryComponent,
    CreateGalleryComponent,
    CreateArtworkComponent,
    AssignGalleryComponent,
    PrintingComponent,
    ConfirmOrderComponent,
    ThankYouComponent,
    PrintModerationComponent,
    LandingComponent,
    SizesComponent,
    ColoursComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
    ColorPickerModule,
    NgbModule,
    BrowserAnimationsModule,
    AngularDraggableModule,
    DragDropModule,
    MatSliderModule,
    PinchZoomModule,
    // MatToolbarModule,
     //MatSidenavModule,
    // MatListModule,
    // MatButtonModule,
    // MatIconModule
  ],
  providers: [NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
