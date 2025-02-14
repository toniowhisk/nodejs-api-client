// Here are the types, they are useful to have exact types of the responses

export type GetProductsType = {
  getProducts?: PaginatedProductsType;
};

export type PaginatedProductsType = {
  filters?: Array<FiltersType>;
  pagination?: PaginationType;
  products?: Array<ProductType>;
  topOffers?: Array<ProductType>;
};

export type FiltersType = {
  name?: string;
  values?: FiltersValuesType;
};

export type FiltersValuesType = {
  value?: string;
  count?: number;
};

export type PaginationType = {
  perPage?: number;
  currentPage?: number;
  totalPage?: number;
  total?: number;
  next?: string;
  previous?: string;
};

export type ProductType = {
  id?: string;
  identifiers?: IdentifiersType;
  name?: string;
  classification?: string;
  arrowCategories?: Array<string>;
  arrowSubCategories?: Array<string>;
  licenseAgreementType?: string;
  family?: FamilyType;
  isAddon?: boolean;
  hasAddons?: boolean;
  actionFlags?: ActionFlagsType;
  addonPrimaries?: Array<IdentifiersType>;
  conversionOfferPrimaries?: Array<IdentifiersType>;
  baseOfferPrimaries?: Array<IdentifiersType>;
  assets?: AssetsType;
  environmentAvailability?: string;
  marketplace?: string;
  isEnabled?: boolean;
  isTrial?: boolean;
  isIndirectBusiness?: boolean;
  lastUpdate?: string;
  marketingText?: MarketingTextType;
  vendorOfferUrl?: string;
  serviceDescription?: string;
  eula?: string;
  endCustomerEula?: string;
  endCustomerRequirements?: string;
  endCustomerFeatures?: string;
  xspUrl?: string;
  saleConstraints?: SaleConstraintsType;
  vendor?: VendorType;
  program?: GraphqlProgramType;
  weightTopSales?: number;
  weightForced?: number;
  priceBand?: Array<PriceBandType>;
  defaultPriceBand?: PriceBandType;
  relatedOffers?: Array<RelatedOfferType>;
  resellers?: OfferResellersType;
  scope?: string;
};

export type IdentifiersType = {
  arrowsphere?: ArrowsphereIdentifierType;
  vendor?: VendorIdentifierType;
};

export type ArrowsphereIdentifierType = {
  sku?: string;
  skuXsp?: string;
  skuXac?: string;
  orderableSku?: string;
};

export type VendorIdentifierType = {
  name?: string;
  family?: string;
  offerName?: string;
  sku?: string;
  attributes?: AttributesType;
};

export type AttributesType = {
  cancelSubscription?: boolean;
  canSwitchAutoRenew?: boolean;
  decreaseSeats?: boolean;
  increaseSeats?: boolean;
  partIdentifier?: string;
  periodicity?: number;
  planId?: string;
  productId?: string;
  productSku?: string;
  reactivateSubscription?: boolean;
  suspendSubscription?: boolean;
  term?: number;
  unitType?: string;
};

export type FamilyType = {
  id?: string;
  name?: string;
};

export type ActionFlagsType = {
  isAutoRenew?: boolean;
  isManualProvisioning?: boolean;
  renewalSku?: string;
};

export type AssetsType = {
  featurePictureUrl?: string;
  mainLogoUrl?: string;
  pictureUrl?: string;
  squareLogoUrl?: string;
};

export type MarketingTextType = {
  overviewDescription?: string;
  featuresShort?: string;
  featuresFull?: string;
  features?: string;
};

export type SaleConstraintsType = {
  customerQualifications?: Array<string>;
  resellerQualifications?: Array<string>;
  minQuantity?: number;
  maxQuantity?: number;
  maxSubscriptionConstraint?: string;
  maxSubscriptionPerCustomer?: number;
  saleGroup?: string;
  requiredAttributes?: Array<string>;
};

export type VendorType = {
  name?: string;
};

export type GraphqlProgramType = {
  isEnabled?: boolean;
  legacyCode?: string;
  names?: ProgramNameType;
};

export type ProgramNameType = {
  full?: string;
};

export type PriceBandType = {
  actionFlags?: PriceBandActionFlagsType;
  attributes?: Array<AttributeType>;
  billing?: BillingType;
  currency?: string;
  dynamicAttributes?: DynamicAttributesType;
  family?: FamilyType;
  identifiers?: PriceBandIdentifiersType;
  isEnabled?: boolean;
  marketplace?: string;
  name?: string;
  orderingType?: string;
  prices?: PricesType;
  saleConstraints?: PriceBandSaleConstraintsType;
  uom?: UomType;
};

export type PriceBandActionFlagsType = {
  canBeCancelled?: boolean;
  canBeReactivated?: boolean;
  canBeSuspended?: boolean;
  canDecreaseSeats?: boolean;
  canIncreaseSeats?: boolean;
};

export type AttributeType = {
  name?: string;
  value?: string;
};

export type BillingType = {
  cycle?: number;
  term?: number;
  type?: string;
};

export type DynamicAttributesType = {
  diskSize?: string;
  ram?: string;
  region?: string;
  vCpu?: string;
  reservationsAutofitGroup?: string;
  acu?: string;
  marketSegment?: string;
  version?: string;
  metric?: string;
};

export type PriceBandIdentifiersType = {
  arrowsphere?: PriceBandArrowsphereIdentifierType;
  erp?: ErpIdentifierType;
  vendor?: PriceBandVendorIdentifierType;
};

export type PriceBandArrowsphereIdentifierType = {
  sku?: string;
};

export type ErpIdentifierType = {
  sku?: string;
};

export type PriceBandVendorIdentifierType = {
  purchasePlan?: string;
  sku?: string;
};

export type PricesType = {
  buy?: string;
  sell?: string;
  public?: string;
};

export type PriceBandSaleConstraintsType = {
  availableDate?: string;
  expiryDate?: string;
  minQuantity?: number;
  maxQuantity?: number;
};

export type UomType = {
  quantity?: number;
  type?: string;
};

export type RelatedOfferType = {
  vendor?: string;
  sku?: string;
};

export type OfferResellersType = {
  owner?: ResellerType;
  viewers?: Array<ResellerType>;
};

export type ResellerType = {
  xspRef?: string;
};
