import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PublicComponent} from './public/public.component';
import {LoginComponent} from './public/login/login.component';
import {LandingComponent} from './public/landing/landing.component';
import {HomeComponent} from './public/home/home.component';
import {AdminComponent} from './admin/admin.component';
import {AdminHomeComponent} from './admin/home/home.component';
import {EventComponent} from './admin/event/event.component';
import {CreateEventComponent} from './admin/event/create-event/create-event.component';
import {UserComponent} from './admin/user/user.component';
import {CreateUserComponent} from './admin/user/create-user/create-user.component';
import {NewAppComponent} from './admin/new-app/new-app.component';
import {RegistrationComponent} from './public/registration/registration.component';
import {ProductComponent} from './admin/product/product.component';
import {CreateProductComponent} from './admin/product/create-product/create-product.component';
import {AppListComponent} from './admin/new-app/app-list/app-list.component';
import { ProductPublicComponent } from './public/product/ProductPublicComponent';
import { SizesComponent } from './public/product/sizes/sizes.component';
import { ColoursComponent } from './public/product/colours/colours.component';
import {ArtworkComponent} from './admin/artwork/artwork.component';
import {GalleryComponent} from './admin/gallery/gallery.component';
import {CreateGalleryComponent} from './admin/gallery/create-gallery/create-gallery.component';
import {CreateArtworkComponent} from './admin/artwork/create-artwork/create-artwork.component';
import {AssignGalleryComponent} from './admin/gallery/assign-gallery/assign-gallery.component';
import {PrintModerationComponent} from './admin/print-moderation/print-moderation.component';
import {PrintingComponent} from './public/printing/printing.component';
import {ConfirmOrderComponent} from './public/confirm-order/confirm-order.component';
import {ThankYouComponent} from './public/thank-you/thank-you.component';

const routes: Routes = [
  {
    path:'',
    component: PublicComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'landing/:id/:user', component: LandingComponent },
      { path: 'home/:id/:user', component: HomeComponent },
      { path: 'registration/:id/:user', component: RegistrationComponent },
      { path: 'product/:id/:user/:client', component: ProductPublicComponent },
      { path: 'product-size/:id/:user/:client/:product', component: SizesComponent },
      { path: 'product-color/:id/:user/:client/:product/:size', component: ColoursComponent },
      { path: 'printing/:id/:user/:product/:client', component: PrintingComponent },
      { path: 'confirm-order/:id/:user/:product/:client', component: ConfirmOrderComponent },
      { path: 'thank-you/:id/:user', component: ThankYouComponent }
    ]
  },
  {
      path:'admin',
      component: AdminComponent,
      children: [
        { path: 'dashboard', component: AdminHomeComponent },
        { path: 'event', component: EventComponent },
        { path: 'create-event', component: CreateEventComponent },
        { path: 'user', component: UserComponent },
        { path: 'create-user', component: CreateUserComponent },
        { path: 'new-app/:id/:tab', component: NewAppComponent },
        { path: 'product', component: ProductComponent },
        { path: 'create-product', component: CreateProductComponent },
        { path: 'app-list', component: AppListComponent },
        { path: 'gallery', component: GalleryComponent },
        { path: 'create-gallery', component: CreateGalleryComponent },
        { path: 'artwork/:gallery', component: ArtworkComponent },
        { path: 'create-artwork/:gallery', component: CreateArtworkComponent },
        { path: 'assign-gallery/:product/:gallery/:event', component:AssignGalleryComponent },
        { path: 'print-moderation', component:PrintModerationComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash!: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
