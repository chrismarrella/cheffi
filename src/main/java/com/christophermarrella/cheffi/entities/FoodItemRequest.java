package com.christophermarrella.cheffi.entities;

public class FoodItemRequest {
    private String foodName;
    private String foodAmount;
    private String expireYear;
    private String expireMonth;
    private String expireDay;
    private String removeItem;

    public FoodItemRequest(String foodName, String foodAmount, String expireYear, String expireMonth, String expireDay,
                           String removeItem) {
        this.foodName = foodName;
        this.foodAmount = foodAmount;
        this.expireYear = expireYear;
        this.expireMonth = expireMonth;
        this.expireDay = expireDay;
        this.removeItem = removeItem;
    }

    public String getFoodName() {
        return foodName;
    }

    public void setFoodName(String foodName) {
        this.foodName = foodName;
    }

    public String getFoodAmount() {
        return foodAmount;
    }

    public void setFoodAmount(String foodAmount) {
        this.foodAmount = foodAmount;
    }

    public String getExpireYear() {
        return expireYear;
    }

    public void setExpireYear(String expireYear) {
        this.expireYear = expireYear;
    }

    public String getExpireMonth() {
        return expireMonth;
    }

    public void setExpireMonth(String expireMonth) {
        this.expireMonth = expireMonth;
    }

    public String getExpireDay() {
        return expireDay;
    }

    public void setExpireDay(String expireDay) {
        this.expireDay = expireDay;
    }

    public String getRemoveItem() {
        return removeItem;
    }

    public void setRemoveItem(String removeItem) {
        this.removeItem = removeItem;
    }
}
