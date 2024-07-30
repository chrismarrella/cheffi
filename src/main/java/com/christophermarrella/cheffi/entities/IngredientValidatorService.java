package com.christophermarrella.cheffi.entities;

import com.christophermarrella.cheffi.entity_interfaces.IngredientValidator;

public class IngredientValidatorService implements IngredientValidator {
    @Override
    public boolean ingredientIsValid(String ingredient) {
        if (!ingredient.matches("[a-zA-Z]+[-]?[a-zA-Z]+")) {
            return false;
        }

        return !ingredient.isEmpty();
    }
}
