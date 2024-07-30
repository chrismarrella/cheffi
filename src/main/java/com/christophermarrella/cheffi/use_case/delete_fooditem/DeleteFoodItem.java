package com.christophermarrella.cheffi.use_case.delete_fooditem;

import com.christophermarrella.cheffi.entities.FoodItem;
import com.christophermarrella.cheffi.entities.FoodItemRequest;
import com.christophermarrella.cheffi.entities.UserInventory;

import java.util.ArrayList;

public class DeleteFoodItem {

    public static void deleteFoodItem(UserInventory userInventory, FoodItemRequest foodItemRequest) {
        String foodItem = foodItemRequest.getFoodName();
        float Amount = 1.0f;

        try {
            ArrayList<FoodItem> inventory = new ArrayList<>(userInventory.getQueue());

            FoodItem foundFoodItem = null;
            boolean found = false;
            int i = 0;

            while (i < inventory.size() && !found) {
                FoodItem item = inventory.get(i);
                if (item.getName().equals(foodItem)) {
                    foundFoodItem = item;
                    found = true;
                }
                i += 1;
            }

            float foundAmount = foundFoodItem.getAmount();
            if (Amount < foundAmount) {
                foundFoodItem.setAmount(foundAmount - Amount);
            } else {
                userInventory.removeSpecificItem(foundFoodItem);
            }
        } catch (Exception e) {
            System.out.println("Food item not found");

        }




    }
}
