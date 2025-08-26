/** Angular Imports */
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

/** Custom Services */
import { ProductsService } from '../../products.service';
import { SettingsService } from 'app/settings/settings.service';
import { STANDALONE_SHARED_IMPORTS } from 'app/standalone-shared.module';

@Component({
  selector: 'mifosx-create-current-account-product',
  templateUrl: './create-current-account-product.component.html',
  styleUrls: ['./create-current-account-product.component.scss'],
  imports: [
    ...STANDALONE_SHARED_IMPORTS
  ]
})
export class CreateCurrentAccountProductComponent implements OnInit {
  currentAccountProductForm: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    this.currentAccountProductForm = this.formBuilder.group({
      name: [
        '',
        Validators.required
      ],
      shortName: [
        '',
        Validators.required
      ]
    });
  }

  submit() {
    const formData = this.currentAccountProductForm.value;
    const locale = this.settingsService.language.code;
    const data = {
      ...formData,
      locale
    };
    this.productsService.createCurrentAccountProduct(data).subscribe(() => {
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }
}
