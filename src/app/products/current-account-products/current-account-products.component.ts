/** Angular Imports */
import { Component, OnInit, TemplateRef, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import {
  MatTableDataSource,
  MatTable,
  MatColumnDef,
  MatHeaderCellDef,
  MatHeaderCell,
  MatCellDef,
  MatCell,
  MatHeaderRowDef,
  MatHeaderRow,
  MatRowDef,
  MatRow
} from '@angular/material/table';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

/* Custom Services */
import { PopoverService } from '../../configuration-wizard/popover/popover.service';
import { ConfigurationWizardService } from '../../configuration-wizard/configuration-wizard.service';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { STANDALONE_SHARED_IMPORTS } from 'app/standalone-shared.module';

@Component({
  selector: 'mifosx-current-account-products',
  templateUrl: './current-account-products.component.html',
  styleUrls: ['./current-account-products.component.scss'],
  imports: [
    ...STANDALONE_SHARED_IMPORTS,
    FaIconComponent,
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatSortHeader,
    MatCellDef,
    MatCell,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    MatPaginator
  ]
})
export class CurrentAccountProductsComponent implements OnInit, AfterViewInit {
  currentAccountProductsData: any;
  displayedColumns: string[] = [
    'name',
    'shortName'
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @ViewChild('buttonCurrentAccountProduct') buttonCurrentAccountProduct: ElementRef<any>;
  @ViewChild('templateButtonCurrentAccountProduct') templateButtonCurrentAccountProduct: TemplateRef<any>;
  @ViewChild('currentAccountProductTable') currentAccountProductTable: ElementRef<any>;
  @ViewChild('templateCurrentAccountProductTable') templateCurrentAccountProductTable: TemplateRef<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private configurationWizardService: ConfigurationWizardService,
    private popoverService: PopoverService
  ) {
    this.route.data.subscribe((data: { currentAccountProducts: any }) => {
      this.currentAccountProductsData = data.currentAccountProducts;
    });
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.currentAccountProductsData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    if (this.configurationWizardService['showCurrentAccountProductsPage'] === true) {
      setTimeout(() => {
        this.showPopover(
          this.templateButtonCurrentAccountProduct,
          this.buttonCurrentAccountProduct.nativeElement,
          'bottom',
          true
        );
      });
    }

    if (this.configurationWizardService['showCurrentAccountProductsList'] === true) {
      setTimeout(() => {
        this.showPopover(
          this.templateCurrentAccountProductTable,
          this.currentAccountProductTable.nativeElement,
          'top',
          true
        );
      });
    }
  }

  showPopover(
    template: TemplateRef<any>,
    target: HTMLElement | ElementRef<any>,
    position: string,
    backdrop: boolean
  ): void {
    setTimeout(() => this.popoverService.open(template, target, position, backdrop, {}), 200);
  }

  nextStep() {
    this.configurationWizardService['showCurrentAccountProductsPage'] = false;
    this.configurationWizardService['showCurrentAccountProductsList'] = false;
    this.router.navigate(['/products']);
  }

  previousStep() {
    this.configurationWizardService['showCurrentAccountProductsPage'] = false;
    this.configurationWizardService['showCurrentAccountProductsList'] = false;
    this.router.navigate(['/products']);
  }
}
