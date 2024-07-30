package com.christophermarrella.cheffi.use_case.add_fooditem;

import com.christophermarrella.cheffi.entities.FoodItem;
import com.christophermarrella.cheffi.entities.FoodItemRequest;
import com.christophermarrella.cheffi.entities.UserInventory;

public class AddFoodItem {

    public static void addFoodItem(UserInventory userInventory, FoodItemRequest foodItemRequest) {
        userInventory.addItem(new FoodItem(
                foodItemRequest.getFoodName(),
                Integer.parseInt(foodItemRequest.getExpireYear()),
                Integer.parseInt(foodItemRequest.getExpireMonth()),
                Integer.parseInt(foodItemRequest.getExpireDay()),
                Float.parseFloat(foodItemRequest.getFoodAmount())
        ));
    }
}
