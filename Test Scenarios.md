# Task 1 - Guest Checkout Test Scenarios

## Feature: Guest checkout for a shopper

As a shopper  
I want to find a product and purchase it using guest checkout  
So that I can place an order without creating an account

### Scenario 1 - Browse and open a product

Given I am on the Automation Test Store home page  
When I browse to a product through a category or subcategory  
And I open the product  
Then I should see the product details page  
And I should see the correct product name

Variations:
- Browse through a category and subcategory
- Browse directly through a category

### Scenario 2 - Add a product to the basket and update quantity

Given I am viewing a product details page  
When I add the product to the basket  
Then I should see the selected product in the basket  
And I should see the correct quantity and unit price

When I update the product quantity  
Then I should see the updated quantity  
And I should see the product total recalculated correctly

### Scenario 3 - Complete guest checkout successfully

Given I have a product in the basket  
When I proceed to checkout  
And I select guest checkout  
And I enter valid mandatory checkout details  
And I continue to the checkout confirmation page  
Then I should see the selected product and quantity correctly

When I confirm the order  
Then I should see that the order has been processed successfully  
And I should see a successful order confirmation message

### Scenario 4 - Validate mandatory checkout fields

Given I have selected guest checkout  
When I submit the checkout form without entering the mandatory fields  
Then I should see validation messages for the required fields  
And I should not be able to continue with the checkout

### Scenario 5 - Validate invalid checkout information

Given I have selected guest checkout  
When I enter invalid checkout information such as an invalid email address  
And I submit the checkout form  
Then I should see an appropriate validation message  
And I should not be able to continue until the invalid information is corrected

# Task 2 - Additional Scenarios

### Additional Test Scenario 1 - Search behaviour and empty results

Given I am on the Automation Test Store  
When I search for an existing product  
Then I should see matching products in the search results

When I search for a product that does not exist  
Then I should see a clear message indicating that no results were found

**Reason:** Search functionality is important when a user cannot easily find a product from the homepage. Testing both positive and negative scenarios gives confidence that users can find the products they need and receive clear feedback when no results are available.

### Additional Test Scenario 2 - Remove the final item from the basket

Given I have added a product to the basket  
When I remove the final remaining item  
Then I should see the product removed successfully  
And I should see that the basket is empty

**Reason:** Removing an item from the basket is a common user action. Testing the final remaining item also confirms that the application handles the change from a populated basket to an empty basket correctly.

### Additional Test Scenario 3 - Basket quantity limits

Given I have added a product to the basket  
When I enter an invalid quantity such as 0, a negative value, or an unusually large number  
Then the application should handle the invalid quantity appropriately  
And I should not see an invalid order quantity or incorrect total in the basket

**Reason:** Quantity directly affects the order total and the checkout process. Testing invalid and boundary values helps identify issues that could result in incorrect totals or unexpected basket behaviour.