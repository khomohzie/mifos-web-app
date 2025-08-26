import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';

import { SettingsService } from 'app/settings/settings.service';
import { STANDALONE_SHARED_IMPORTS } from 'app/standalone-shared.module';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'mifosx-create-current-account-product',
  templateUrl: './create-current-account-product.component.html',
  styleUrls: ['./create-current-account-product.component.scss'],
  imports: [
    ...STANDALONE_SHARED_IMPORTS,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSlideToggleModule
  ]
})
export class CreateCurrentAccountProductComponent implements OnInit {
  currentAccountProductFormGroup: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private settingsService: SettingsService
  ) {
    this.currentAccountProductFormGroup = new FormGroup({});
  }

  ngOnInit(): void {
    this.currentAccountProductFormGroup = new FormGroup({
      details: new FormGroup({
        name: new FormControl('', Validators.required),
        shortName: new FormControl('', Validators.required),
        description: new FormControl('')
      }),
      currency: new FormGroup({
        currencyCode: new FormControl('', Validators.required),
        currencyDigits: new FormControl(2, [
          Validators.required,
          Validators.min(0)]),
        inMultiplesOf: new FormControl(null)
      }),
      financials: new FormGroup({
        minimumOpeningBalance: new FormControl(null),
        maintenanceFeeAmount: new FormControl(null),
        maintenanceFeeFrequency: new FormControl(null),
        overdraftLimit: new FormControl(null),
        transactionLimitPerDay: new FormControl(null),
        minimumBalanceForInterestCalculation: new FormControl(null)
      }),
      interest: new FormGroup({
        interestRate: new FormControl(null),
        interestCalculationType: new FormControl(null),
        interestPostingPeriodType: new FormControl(null)
      })
    });
  }

  get currentAccountProductDetailsForm(): FormGroup {
    return this.currentAccountProductFormGroup.get('details') as FormGroup;
  }

  get currentAccountProductCurrencyForm(): FormGroup {
    return this.currentAccountProductFormGroup.get('currency') as FormGroup;
  }

  get currentAccountProductFinancialsForm(): FormGroup {
    return this.currentAccountProductFormGroup.get('financials') as FormGroup;
  }

  get currentAccountProductInterestForm(): FormGroup {
    return this.currentAccountProductFormGroup.get('interest') as FormGroup;
  }

  private buildPayload() {
    const value = this.currentAccountProductFormGroup.value;
    return {
      // Basic
      name: value.details.name,
      shortName: value.details.shortName,
      description: value.details.description,
      // Currency
      currencyCode: value.currency.currencyCode,
      currencyDigits: value.currency.currencyDigits,
      inMultiplesOf: value.currency.inMultiplesOf,
      // Financials
      minimumOpeningBalance: value.financials.minimumOpeningBalance,
      maintenanceFeeAmount: value.financials.maintenanceFeeAmount,
      maintenanceFeeFrequency: value.financials.maintenanceFeeFrequency,
      overdraftLimit: value.financials.overdraftLimit,
      transactionLimitPerDay: value.financials.transactionLimitPerDay,
      minimumBalanceForInterestCalculation: value.financials.minimumBalanceForInterestCalculation,
      // Interest
      interestRate: value.interest.interestRate,
      interestCalculationType: value.interest.interestCalculationType,
      interestPostingPeriodType: value.interest.interestPostingPeriodType,
      // Locale
      locale: this.settingsService.language.code
    };
  }

  submit() {
    const payload = this.buildPayload();
    // Remove empty values
    Object.keys(payload).forEach((key) =>
      (payload as any)[key] === '' || (payload as any)[key] === null ? delete (payload as any)[key] : null
    );

    this.productsService.createCurrentAccountProduct(payload).subscribe((response: any) => {
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }
}
