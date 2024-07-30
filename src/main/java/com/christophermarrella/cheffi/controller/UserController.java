package com.christophermarrella.cheffi.controller;

import com.christophermarrella.cheffi.entities.DietaryRestrictionRequest;
import com.christophermarrella.cheffi.entities.FoodItemRequest;
import com.christophermarrella.cheffi.entities.User;
import com.christophermarrella.cheffi.entities.UserDietaryPreferences;
import com.christophermarrella.cheffi.repository.UserRepository;
import com.christophermarrella.cheffi.service.UserService;
import com.christophermarrella.cheffi.use_case.get_recipe.GetRecipes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;


import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "api/v1/user")
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;

    @Autowired
    public UserController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @PostMapping
    public void registerNewUser(@RequestBody User user) {
        userService.addNewUser(user);
    }

    @DeleteMapping(path = "{userId}")
    public void deleteUser(@PathVariable("userId") Long userId) {
        userService.deleteUser(userId);
    }

    @PutMapping(path = "{userId}")
    public void updateUser(
            @PathVariable("userId") Long userId,
            @RequestParam(required = false) String username,
            @RequestParam(required = false) String firstname,
            @RequestParam(required = false) String lastname,
            @RequestParam(required = false) String restriction,
            @RequestParam(required = false) Float value) {
        userService.updateUser(userId, username, firstname, lastname, restriction, value);
    }

    @PatchMapping(path = "{userId}")
    public void updateInventory(
            @PathVariable("userId") Long userId,
            @RequestBody FoodItemRequest foodItemRequest){
        userService.updateInventory(userId, foodItemRequest);
    }

    @PatchMapping("/{userId}/dietaryRestrictions")
    public void updateUserDietaryRestrictions(
            @PathVariable("userId") Long userId,
            @RequestBody DietaryRestrictionRequest dietaryRestrictionRequest) {
        userService.updateDietaryRestriction(userId, dietaryRestrictionRequest);
    }

    @GetMapping("/{userId}/recipes")
    public ResponseEntity<String> getRecipesForUser(
            @PathVariable("userId") Long userId) {
        User user = userService.getUserById(userId);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        String recipes = GetRecipes.getRecipes(user);
        System.out.println(recipes);
        return ResponseEntity.ok(recipes);
    }


}