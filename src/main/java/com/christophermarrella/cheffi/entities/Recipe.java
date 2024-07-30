package com.christophermarrella.cheffi.entities;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * This class represents a recipe.
 */
public class Recipe {
    // Temporary
    public String recipeText;

    private String name;
    private List<String> instructions;
    private List<FoodItem> ingredients;
    private Map<String, Float> macros;


    /**
     * Constructor for Recipe
     *
     * @param name         the name of the recipe
     * @param instructions the instructions for the recipe
     * @param ingredients  the ingredients for the recipe
     * @param macros       the macros for the recipe
     */
    public Recipe(String name, List<String> instructions, List<FoodItem> ingredients,
                  Map<String, Float> macros) {
        this.name = name;
        this.instructions = instructions;
        this.ingredients = ingredients;
        this.macros = macros;
    }

    /**
     * Get the name of the recipe
     *
     * @return the name of the recipe
     */
    public String getName() {
        return this.name;
    }

    /**
     * Set the name of the recipe
     *
     * @param name the name of the recipe
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Get the instructions for the recipe
     *
     * @return the instructions for the recipe
     */
    public List<String> getInstructions() {
        return this.instructions;
    }

    /**
     * Set the instructions for the recipe
     *
     * @param instructions the instructions for the recipe
     */
    public void setInstructions(List<String> instructions) {
        this.instructions = instructions;
    }

    /**
     * Get the ingredients for the recipe
     *
     * @return the ingredients for the recipe
     */
    public List<FoodItem> getIngredients() {
        return this.ingredients;
    }

    /**
     * Set the ingredients for the recipe
     *
     * @param ingredients the ingredients for the recipe
     */
    public void setIngredients(List<FoodItem> ingredients) {
        this.ingredients = ingredients;
    }

    /**
     * Get the macros for the recipe
     *
     * @return the macros for the recipe
     */
    public Map<String, Float> getMacros() {
        return this.macros;
    }

    /**
     * Set the macros for the recipe
     *
     * @param macros the macros for the recipe
     */
    public void setMacros(Map<String, Float> macros) {
        this.macros = macros;
    }

    /**
     * Converts a recipe into a map of strings to lists of strings
     *
     * @return a map of strings to lists of strings where the strings are Name, Ingredients, Instructions, or Macros
     * and the corresponding value is the name of the recipe, the ingredients for the recipe, the instructions for
     * the recipe, or the macros for the recipe
     */
    public Map<String, List<String>> toMap() {
        Map<String, List<String>> pref = new HashMap<>();
        List<String> foods = new ArrayList<>();
        List<String> name = new ArrayList<>();
        List<String> nutrients = new ArrayList<>();

        name.add(this.name);

        // food items will be formatted as name:amount, just split by colon when parsing
        for (FoodItem item : this.ingredients) {
            foods.add(item.getName() + ":" + item.getAmount());
        }

        for (String macro : macros.keySet()) {
            nutrients.add(macro + ":" + macros.get(macro));
        }

        pref.put("Name", name);
        pref.put("Ingredients", foods);
        pref.put("Instructions", this.instructions);
        pref.put("Macros", nutrients);

        return pref;
    }

    /**
     * Converts a recipe into a string
     *
     * @return a string representation of the recipe
     */
    @Override
    public String toString() {
        StringBuilder newInstructions = new StringBuilder();
        for (String instruction : this.instructions) {
            newInstructions.append(instruction);
            newInstructions.append("\n");
        }

        StringBuilder newIngredients = new StringBuilder();
        for (FoodItem ingredient : this.ingredients) {
            newIngredients.append(ingredient.getName() + ": " + ingredient.getAmount());
            newIngredients.append("\n");
        }

        StringBuilder newMacros = new StringBuilder();
        for (String macro : this.macros.keySet()) {
            newMacros.append(macro + ": " + this.macros.get(macro));
            newMacros.append("\n");
        }

        return "Name: " + this.name + '\n' +
                "Instructions: " + newInstructions +
                "Ingredients: " + newIngredients +
                "Macros: " + newMacros;
    }
}