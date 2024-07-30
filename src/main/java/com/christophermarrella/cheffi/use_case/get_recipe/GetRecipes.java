package com.christophermarrella.cheffi.use_case.get_recipe;

import com.christophermarrella.cheffi.data_access.RetrieveRecipes;
import com.christophermarrella.cheffi.entities.User;
import com.christophermarrella.cheffi.entities.UserDietaryPreferences;
import com.christophermarrella.cheffi.entity_interfaces.DietaryPreferences;
import com.christophermarrella.cheffi.entities.Recipe;

import java.util.List;
import java.util.Map;

public class GetRecipes {

    public static String getRecipes(User user) {
        Map<String, Float> restrictionMap = user.getRestrictionMap();

        UserDietaryPreferences dietaryPreferences = new UserDietaryPreferences(restrictionMap);
        Recipe recipe = RetrieveRecipes.retrieveRecipes(user);
        return recipe.toString();
    }
}
