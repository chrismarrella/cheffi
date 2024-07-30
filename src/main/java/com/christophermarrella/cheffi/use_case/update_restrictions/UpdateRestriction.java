package com.christophermarrella.cheffi.use_case.update_restrictions;

import com.christophermarrella.cheffi.entities.User;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

public class UpdateRestriction {


    public static void updateRestriction(User user, String restriction, Float value) {
        Set<String> restrictedRestrictions = new HashSet<>(Arrays.asList(
                "Ketogenic", "Vegan", "Vegetarian", "Maximum Protein", "Minimum Protein",
                "Maximum Carbohydrates", "Minimum Carbohydrates", "Maximum Fat", "Minimum Fat", "Maximum Calories", "Minimum Calories"));
        Set<String> dietTypes = new HashSet<>(Arrays.asList("Ketogenic", "Vegan", "Vegetarian"));

        if (restrictedRestrictions.contains(restriction.toLowerCase())) {
            System.out.println("First if statement passed: " + restriction + value);

            if (dietTypes.contains(restriction.toLowerCase())) {
                // Remove the existing restriction and add the new one
                user.removeRestriction(restriction, user.getRestriction(restriction));
                user.addRestriction(restriction, 0f);
                System.out.println("Second if statement passed");
            }
        } else {
            user.addRestriction(restriction, value);
        }
    }
}
