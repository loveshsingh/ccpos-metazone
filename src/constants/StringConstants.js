// /**
//  * Webkul Software.
//  *
//  * @category Webkul
//  * @package Webkul_Mobikul_Odoo_Pos
//  * @author Webkul
//  * @copyright Copyright (c) WebkulSoftware Private Limited (https://webkul.com)
//  * @license https://store.webkul.com/license.html
//  *
//  */
// export const StringConstants = {
//     ORDER_PREFIX_LABEL_FOR_SERVER: "mobikulPos",
//     LABEL_LOGIN: "LOGIN",
//     pleaseWaitTextLabel: "Please Wait",
//     noInternetConnectivityMsg: 'Internet not available, Cross check your internet connectivity and try again',
//     NetworkUnavailableMsg: 'Network Unavailable',
//     RetryButtonLabel: 'Retry',
//     syncWithPreviousSessionButtonLabel: 'Sync With Previous Session',
//     syncWithNewSessionButtonLabel: 'No, I will Sync With New Session',
//     loadingTextLabel: "Loading ...",
//     usernameLabel: "Email/Username",
//     passwordLabel: "Password",
//     showPasswordLabel: "Show Password",
//     hidePasswordLabel: "Hide Password",
//     emailOrUsernameCannotBeEmptyLabel: "Email/Username cannot be empty",
//     enterValidEmailLabel: "Please enter a valid email",
//     passwordCannotBeEmptyLabel: "Password cannot be empty",
//     DashboardPageTitle: "Point of Sale",
//     LogoutLabel: "Logout",
//     LogoutAlertTitle: "Logout",
//     LogoutAlertBody: "Are you Sure You want to logout?",
//     LogoutAlertSuccessButtonLabel: "Yes, I want To Logout",
//     LogoutSuccessfulMessage: "Logout successful",
//     CancelButtonLabel: "Cancel",
//     submitButtonLabel: "Submit",
//     saveButtonLabel: "Save",
//     NewSessionLabel: "New Session",
//     ResumeSessionLabel: "Resume",
//     CloseSessionLabel: "Close",
//     NewSessionShopSubtitleLabel: "Unused",
//     ResumeSessionShopSubtitleLabel: "In Progress",
//     MainScreenBottomHomeLabel: "Home",
//     MainScreenBottomOrdersPageLabel: "Orders",
//     MainScreenBottomHoldOrdersPageLabel: "Hold-Cart",
//     MainScreenBottomCashDrawerLabel: "Cash Drawer",
//     MainScreenBottomViewMoreLabel: "More",
//     MainScreenDefaultCategoryLabel: "Default Category",
//     MainScreenHomeSectionLabel: "Point of Sale",
//     MainScreeenCartSectionHeaderLabel: "Cart",
//     EmptySectionLabel: "Oops, nothing found here",
//     ViewProductsInPrefix: "View All Products in ",
//     loadingCategoriesLabel: "Loading Categories ...",
//     loadingProductsLabel: "Loading Products ...",
//     loadingCustomersLabel: "Loading Customers ...",
//     nothingToDisplayLabel: "No Data Found \nPlease contact the website support Team.",
//     SearchProductsPlaceHolderLabel: "Search Products ...",
//     noProductsFound: "No Products to display here \nIf you are searching then try searching with some different keyword",
//     cartCustomerButtonLabel: "Customer",
//     cartPaymentButtonLabel: "Payment",
//     labelNumericKeyOne: '1',
//     labelNumericKeyTwo: '2',
//     labelNumericKeyThree: '3',
//     labelNumericKeyFour: '4',
//     labelNumericKeyFive: '5',
//     labelNumericKeySix: '6',
//     labelNumericKeySeven: '7',
//     labelNumericKeyEight: '8',
//     labelNumericKeyNine: '9',
//     labelNumericKeyZero: '0',
//     labelNumericKeyComplimentary: 'Cmp',
//     labelNumericKeyDecimal: '.',
//     labelNumericKeyAddSubtract: '+/-',
//     cartButtonQtyLabel: 'Qty',
//     cartButtonDiscountLabel: 'Disc',
//     cartButtonPriceLabel: 'Price',
//     cartButtonDeleteLabel: 'Del',
//     cartEmptyMsg: 'Your shopping cart is Empty',
//     totalLabel: 'Total : ',
//     totalItemLabel: 'Items : ',
//     totalQtyLabel: 'Quantity : ',
//     taxesLabel: 'Taxes : ',
//     SearchCustomersPlaceHolderLabel: 'Search Customers ...',
//     SelectCustomerLabel: 'Select Customer',
//     customerListEmptyMsg: 'No customers found.\nStart by adding new customer details.',
//     newCustomerNameLabel: 'Name(as on Aadhaar)*',
//     newCustomerEmailLabel: 'Email',
//     newCustomerPhoneLabel: 'Phone(10 digit)*',
//     newCustomerWhatsAppLabel: 'WhatsApp No.',
//     newCustomerStreetLabel: 'Land Address*',
//     newCustomerCityLabel: 'City',
//     newCustomerPostcodeLabel: 'Pin Code',
//     newCustomerBarcodeLabel: 'Barcode',
//     newCustomerTaxLabel: 'Tax',
//     newCustomerStateLabel: 'State*',
//     newCustomerCountryLabel: 'Country*',
//     newCustomerNameCannotBeEmpty: 'Name cannot be empty',
//     newCustomerPhoneCannotBeEmpty: 'Phone Number cannot be empty',
//     noCustomerSelectedMsg: 'Please select a customer then proceed for payment.',
//     invalidTotalMsg: 'The total for the current order is not correct. Please do check prices of the items in the cart',
//     PaymetnDetailsLabel: 'Payment Details',
//     ValidateButtonLabel: 'Validate',
//     BackButtonLabel: 'Back',
//     paymentListEmptyMsg: 'No payment methods available \nPlease contact the website administrator',
//     pleaseSelectPaymentMethodMsg: 'Please select a Payment Method.',
//     paymentPageDueLabel: 'Due',
//     paymentPageTenderedLabel: 'Tendered',
//     paymentPageChangeLabel: 'Change',
//     paymentPageMethodLabel: 'Method',
//     orderSuccessMessageLine1: 'Your order has been placed successfully.',
//     orderSuccessMessageLine2: 'Your Order Id is :',
//     newOrderButtonLabel: 'New order',
//     invoiceButtonLabel: 'Invoice',
//     OrderDetailsLabel: 'Order Details',
//     onlineOrderLabel: 'Online',
//     offlineOrderLabel: 'Offline',
//     noOrdersToDisplayMsg: 'No Orders Found',
//     noOrderDetailsToDisplayMsg: 'No order details found to display here',
//     amountPaidLabel: 'Amount Paid by Customer',
//     amountReturnedLabel: 'Amount Returned',
//     amountTotalLabel: 'Total Amount',
//     itemTotalLabel: 'Total Items',
//     qtyTotalLabel: 'Total Quantity',
//     orderedProductsLabel: 'Product Details',
//     orderProductQtyLabel: 'Quantity : ',
//     orderProductUnitPriceLabel: 'Unit Price : ',
//     AreYouSureLabel: 'Are you sure ?',
//     DeleteAllCartIemsWarningMsg: 'Do you want to delete all the items from cart ?',
//     cartDeleteAlertConfirmButtonLabel: 'Yes, Delete',
//     HoldCartWarningMsg: 'Do you want to hold the current Cart ?',
//     holdCartAlertConfirmButtonLabel: 'Yes, Hold current cart',
//     cartDetailsLabel: 'Cart Details',
//     noHoldCartsToDisplayMsg: 'No Hold Carts Found',
//     noHoldCartDetailsToDisplayMsg: 'No Hold Cart details found to display here',
//     DeleteThisHoldCarWarningMsg: 'Do you want to delete this hold cart ?',
//     moveHoldcartToCheckOutMsg: 'Do you really wish to move this Hold Cart to checkout \nIf there are any item(s) in your cart then those will be removed',
//     moveHoldCartProceedButtonLabel: 'Yes, Proceed',
//     SyncThisOrderLabel: 'Sync Order',
//     ERROR_NO_KEY_FOUND: 'Oops No key found! Contact admin/developer',
//     newCustomerTalukLabel: 'Taluk*',
//     newCustomerDistrictLabel: 'District*',
//     newCustomerVillageLabel: 'Village',
//     newCustomerAadhaarNoLabel: 'Aadhaar No',
//     newCustomerPanNoLabel: 'Pan No',
//     newCustomerFarmLandAreaLabel: 'Farm Land Area(In Acres)',
//     newCustomerFarmAddress: 'Farm Address',
//     SyncAllOrderLabel: 'Sync All',
//     allOfflineOrderAreSynced: 'All offline orders are synced',
//     MainScreenBottomCloseSessionPageLabel: "Close Session",
//     currentSessionIsNotStartedToday: 'Please close the current session and start new session, As it wasn\'t started today',
//     addedToCart: 'added to cart!',
//     space: ' ',
//     CloseSessionWarningMsg: 'Close session will generate the receipt do you want to proceed?',
//     CloseSessionButtonLabel: 'Yes, Close Session',
//     homePageAlertConfirmButtonLabel: 'Yes, Go back to Home Page',
//     homePageCartItemError: 'You have left some item in cart. Please save cart items or remove before closing session.',
//     panValidationErrorMsg: 'The total of current order is greater than Rs. 50,000. Please add PAN number for customer',
//     panValidationErrorMsg_200K: 'The total of current year order is greater than Rs. 2,00,000. Please add PAN number for customer',
//     newCustomerTax15Character: 'Tax number should be of 15 character',
//     newCustomerPhone10Digit: 'Phone number should be of 10 digits length',
//     newCustomerWhatsAppNo10Digit: 'Whats App Number should be of 10 digits length',
//     newCustomerPinCode6Digit: 'Pin Code should be of 6 digits length',
//     newCustomerAadhaar12Digit: 'Aadhaar should be of 12 digits length',
//     newCustomerFarmLandAreaCannotBeEmpty: 'Farm land area cannot be empty',
//     newCustomerHomeAddressCannotBeEmpty: 'Land Address cannot be empty',
//     newCustomerFarmAddressCannotBeEmpty: 'Farm Address cannot be empty',
//     newCustomerTalukCannotBeEmpty: 'Taluk cannot be empty',
//     newCustomerDistrictCannotBeEmpty: 'District cannot be empty',
//     newCustomerVillageCannotBeEmpty: 'Village cannot be empty',
//     newCustomerCityCannotBeEmpty: 'City/Village cannot be empty',
//     newCustomerStateCannotBeEmpty: 'State cannot be empty',
//     newCustomerCountryCannotBeEmpty: 'Country cannot be empty',
//     totalDiscount: 'Discounted Total',
//     discountGiven: 'Discount : ',
//     discountApplied: 'Discount applied',
//     discountRemarksLabel: 'Discount Remarks',
//     purposeLabel: 'Purpose',
//     orderPreviewLabel: "Order Preview",
//     ddChequeNoLabel: "DD/Cheque No.",
//     discountRemarksRequired: 'Please add discount remarks to proceed',
//     purposeMandatory: 'Please select a purpose of purchase',
//     ddChequeNoRequired: 'Please add DD/Cheque number to proceed',
//     newFarmType: 'Farm Type',
//     newFarmTypeCannotBeEmpty: 'Farm type cannot be empty',
//     newFarmName: 'Farm Name',
//     newFarmNameCannotBeEmpty: 'Farm name cannot be empty',
//     newFarmStreet1: 'Street1',
//     newFarmStreet1CannotBeEmpty: 'Farm street1 cannot be empty',
//     newFarmStreet2: 'Street2',
//     newFarmStreet2CannotBeEmpty: 'Farm street2 cannot be empty',
//     newFarmCity: 'City',
//     newFarmCityCannotBeEmpty: 'Farm city cannot be empty',
//     newFarmPinCode: 'Pin Code',
//     newFarmPinCodeCannotBeEmpty: 'Farm city cannot be empty',
//     newFarmPinCode6Digit: 'Farm pin Code should be of 6 digits length',
//     newFarmCountry: 'Country*',
//     newFarmCountryCannotBeEmpty: 'Farm country cannot be empty',
//     newFarmState: 'State*',
//     newFarmStateCannotBeEmpty: 'Farm state cannot be empty',
//     newFarmDistrict: 'District*',
//     newFarmDistrictCannotBeEmpty: 'Farm district cannot be empty',
//     newFarmTaluk: 'Taluk*',
//     newFarmTalukCannotBeEmpty: 'Farm taluk cannot be empty',
//     newFarmVillage: 'Village*',
//     newFarmVillageCannotBeEmpty: 'Farm village cannot be empty',
//     farmer: 'Farmer',
//     vendor: 'Vendor',
//     cashVendor: 'Cash Vendor',
//     mediator: 'Mediator',
//     addFarm: 'Add Farm',
//     saveFarm: 'Save Farm',
//     reset: 'Reset',
//     selectCountryItem: '--Select Country--',
//     selectStateItem: '--Select State--',
//     selectTalukItem: '--Select Taluk--',
//     selectDistrictItem: '--Select District--',
//     selectVillageItem: '--Select Village--',
//     farmDetailsLabel: 'Farm Details',
//     farmListEmptyMsg: 'No Farms found.\nStart by adding new farm details.',
//     saveCustomer: 'Save Customer',
//     editNotAllowed: 'Edit Not Allowed',
//     editAllowedOnlyInOnlineMode: 'Edit allowed in online mode only',
//     farmLandQuestion1: 'How do you know about us?*',
//     farmLandQuestion1Option1: 'Farmer Mobilization',
//     farmLandQuestion1Option1Value: 'farmer_mobilization',
//     farmLandQuestion1Option2: 'Direct Visit',
//     farmLandQuestion1Option2Value: 'direct_visit',
//     farmLandQuestion2: 'Type of plantation?*',
//     farmLandQuestion2Option1: 'Block Plantation',
//     farmLandQuestion2Option1Value: 'block_plantation',
//     farmLandQuestion2Option2: 'Boundary Plantation',
//     farmLandQuestion2Option2Value: 'boundary_plantation',
//     farmLandQuestion3: 'Farm Land Area (in acre)?*',
//     cannotBeEmpty: 'cannot be empty',
//     enterValidFloatValue: 'enter valid value (e.g. 1 or 1.0)',
//     enterValidNumberValue: 'enter valid value (e.g. 1, 2)',
//     edit: 'Edit',
//     noValidGstFormat: 'GSTIN should be in 99AAAAA9999A9A(9/A) format',
//     gstFormatNotBelongToThisState: "GSTIN entered does not belong to this state",
//     paymentMethodDetailDDNumberLabel: 'DD Number*',
//     paymentMethodDetailDDDateLabel: 'DD Date*',
//     paymentMethodDetailBankNameLabel: 'Bank Name*',
//     paymentMethodDetailBranchNameLabel: 'Branch Name*',
//     paymentMethodDetailChequeNumberLabel: 'Cheque Number*',
//     paymentMethodDetailChequeDateLabel: 'Cheque Date*',
//     paymentMethodDetailTransactionIdLabel: 'Transaction Id*',
//     paymentMethodDetailTransactionDateLabel: 'Transaction Date*',
//     paymentMethodDetailTerminalIdLabel: 'Terminal Id*',
//     paymentMethodDetailApprovalCodeLabel: 'Approval Code*',
//     somethingWentWrong: "Something went wrong !!",
//     invalidData: "Invalid data",
//     card: "card",
//     neft: "neft",
//     rtgs: "rtgs",
//     cheque: "cheque",
//     dd: "dd",
//     cash: "cash",
//     check: "check",
//     somethingWentWrongTryAfterSomeTime: "Something went wrong, try after some time!!",
//     restartAndResumeSessionOrderSyncMsg: "Please restart the app and resume the session with same user_id and try to sync again when internet is available.\nNote: Data might get lost if you use another user_id to login.",
//     restartMsg: "Please restart the app to continue\nNote: Data might get lost if you use another user_id to login.",
//     ordersSyncedButNotInsertedMsg: "Orders synced successfully, but somehow app can't read data.\nPlease restart the app and resume the session with same user_id.\nNote: If problem still persist, please contact the admin.",
//     ifProblemPersistRestartMsg: "If problem persist, please restart the app.\nNote: Data might get lost if you use another user_id to login.",
//     restartAndResumeSessionCloseSessionMsg: "Please restart the app and resume the session with same user_id and try to sync again when internet is available.\nNote: Data might get lost if you use another user_id to login.",
//     sessionNotFoundRestartAndResumeSessionMsg: "No previous session found, please restart the app and resume the session with same user_id.\nNote: Data might get lost if you use another user_id to login.",
//     customerNotFoundRestartAndResumeSessionMsg: "Customer not found, please restart the app and resume the session with same user_id.\nNote: Data might get lost if you use another user_id to login.",
//     internetConnectionProblemTryAgain: "Internet connection problems. Please try again.",
//     internetConnectionProblem: "Internet connection problems.",
//     format_yyyyHIPMMHIPddShhCmmCss: 'yyyy-MM-dd hh:mm:ss',
//     format_ddHIPMMHIPyyyy: 'DD-MM-yyyy',
//     offlineSyncOrdersDescMsg: "There are some offline orders, sync them first to proceed.\nNote: Data might get lost if you use another user_id to login.",
//     allOrdersAreSyncedMsg: "All orders are synced.",
//     offlineOrdersFoundColonMsg: "Offline orders found: ",
//     noDiscountAvailableForThisProduct: "No discount(s) available for this product.",
//     selectProductToApplyDiscount: "Select a product to apply discount!",
//     unableToLoadCustomers: "Unable to load customers",
//     unableToLoadCustomersDescription: "Unable to load customers due to internet connectivity issues or slow response from server resulting timeout",
//     incorrectQuantity: "incorrect quantity",
//     incorrectQuantityMsg: "To proceed, remove this product from cart or at least set quantity to 1",
//     defaultNurseryShortName: "XXX",
//     failedOrder: "failedOrder",
//     customerSyncedButNotInsertedMsg: "Device Error: customers created successfully but can't be able to store\nPlease restart the app.\nNote: Data might get lost if you use another user_id to login.",
//     totalOrdersColon: "Total Orders:",
//     totalAmountColon: "Total Amount:",
//     orderSummary: "Order Summary",
//     noOrdersSummaryDetailFoundLabel: "No Orders Found \nTo see summary first place some order.",
// }