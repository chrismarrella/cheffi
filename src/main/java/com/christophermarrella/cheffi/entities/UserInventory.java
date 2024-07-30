package com.christophermarrella.cheffi.entities;

import com.christophermarrella.cheffi.entity_interfaces.Inventory;
import jakarta.persistence.*;

import java.util.*;

@Embeddable
public class UserInventory implements Iterable<FoodItem> {


    @ElementCollection
    private List<FoodItem> inventory = new ArrayList<>();

    public UserInventory() {
    }

    public UserInventory(List<FoodItem> inventory) {
        this.inventory = inventory;
    }


    public void addItem(FoodItem item) {
        this.inventory.add(item);
    }


    public FoodItem removeItem() {
        if (!this.inventory.isEmpty()) {
            return this.inventory.remove(0);
        }
        return null;
    }


    public boolean removeSpecificItem(FoodItem item) {
        return this.inventory.remove(item);
    }


    public List<FoodItem> getQueue() {
        return this.inventory;
    }


    @Override
    public Iterator<FoodItem> iterator() {
        return new UserInventory.Iter();
    }


    private class Iter implements Iterator<FoodItem>{
        private int index = 0;
        private FoodItem[] temp = inventory.toArray(new FoodItem[inventory.size()]);


        @Override
        public boolean hasNext() {
            return index < inventory.size();
        }


        @Override
        public FoodItem next() {
            if (!hasNext()) {
                throw new NoSuchElementException();
            }
            return temp[index++];
        }
    }
}
