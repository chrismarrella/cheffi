package com.christophermarrella.cheffi.entity_interfaces;

import com.christophermarrella.cheffi.entities.FoodItem;

import java.util.Iterator;
import java.util.List;

public interface Inventory {

    Inventory getInventory();

    void addItem(FoodItem item);

    FoodItem removeItem();

    boolean removeSpecificItem(FoodItem item);

    Iterator<FoodItem> iterator();

    List<FoodItem> getQueue();
}
