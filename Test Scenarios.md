# Task 1 - Guest Checkout Test Scenarios

### Scenario 1 - Browse and open a product

**Given** the shopper is on the Automation Test Store home page  
**When** the shopper browses to a product through a category or subcategory  
**And** opens the product  
**Then** the product details page should be displayed  
**And** the correct product name should be shown

**Variations:**
- Browse through a category and subcategory
- Browse directly through a category

### Scenario 2 - Add a product to the basket and update quantity

**Given** the shopper is viewing a product details page  
**When** the shopper adds the product to the basket  
**Then** the selected product should be shown in the basket  
**And** the correct quantity and unit price should be displayed

**When** the shopper updates the product quantity  
**Then** the new quantity should be displayed  
**And** the product total should be recalculated correctly

### Scenario 3 - Complete guest checkout successfully

**Given** the shopper has a product in the basket  
**When** the shopper proceeds to checkout  
**And** selects guest checkout  
**And** enters valid mandatory checkout details  
**And** continues to the checkout confirmation page  
**Then** the selected product and quantity should be shown correctly

**When** the shopper confirms the order  
**Then** the order should be processed successfully  
**And** a successful order confirmation message should be displayed

### Scenario 4 - Validate mandatory checkout fields

**Given** the shopper has selected guest checkout  
**When** the shopper submits the checkout form without entering the mandatory fields  
**Then** validation messages should be displayed for the required fields  
**And** the shopper should not be able to continue with the checkout

### Scenario 5 - Validate invalid checkout information

**Given** the shopper has selected guest checkout  
**When** the shopper enters invalid information such as an invalid email address  
**And** submits the checkout form  
**Then** an appropriate validation message should be displayed  
**And** the shopper should not be able to continue until the information is corrected

# Task 2 - Additional Scenarios

### Additional Test Scenario 1 - Search behaviour and empty results

**Given** the shopper is on the Automation Test Store  
**When** the shopper searches for an existing product  
**Then** matching products should be displayed

**When** the shopper searches for a product that does not exist  
**Then** the website should clearly indicate that no results were found

**Reason:** Search functionality is important when a user cannot easily find a product from the homepage. Testing both positive and negative scenarios gives confidence that users can find the products they need and receive clear feedback when no results are available

### Additional Test Scenario 2 - Remove the final item from the basket

**Given** the shopper has added a product to the basket  
**When** the shopper removes the final remaining item  
**Then** the product should be removed successfully  
**And** the basket should show that it is empty

**Reason:** Removing item from basket is a very common action from user. From testing perspective - the array or listing is a feature that would easily have issue when developing

### Additional Test Scenario 3 - Basket quantity limits

**Given** the shopper has added a product to the basket  
**When** the shopper enters an invalid quantity such as 0, a negative value, or an unusually large number  
**Then** the application should handle the invalid quantity appropriately  
**And** the basket should not contain an invalid order quantity or incorrect total

**Reason:** Quantity directly affects the order total and the checkout process. Testing invalid and boundary values helps identify issues that could result in incorrect totals or unexpected basket behaviour