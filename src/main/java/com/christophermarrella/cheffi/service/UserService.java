package com.christophermarrella.cheffi.service;

import com.christophermarrella.cheffi.entities.*;
import com.christophermarrella.cheffi.repository.UserRepository;
import com.christophermarrella.cheffi.use_case.delete_fooditem.DeleteFoodItem;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.christophermarrella.cheffi.use_case.update_restrictions.UpdateRestriction;

import com.christophermarrella.cheffi.use_case.add_fooditem.AddFoodItem;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {


    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException(
                        "User with id " + userId + " does not exist"
                ));
    }

    public void addNewUser(User user) {
        Optional<User> userOptional = userRepository
                .findUserByUsername(user.getUsername());
        if (userOptional.isPresent()) {
            throw new IllegalStateException("username taken");
        }
        userRepository.save(user);
    }

    public void deleteUser(Long userId) {
        boolean exists = userRepository.existsById(userId);
        if (!exists) {
            throw new IllegalStateException(
                    "User with id " + userId + " does not exist"
            );
        }
        userRepository.deleteById(userId);

    }

    @Transactional
    public void updateUser(Long userId, String username, String firstname, String lastname,
                            String restriction, Float value) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException(
                        "User with id " + userId + " does not exist"
                ));

        if (firstname != null &&
                !firstname.isEmpty() &&
                !user.getFirstname().equals(firstname)) {
            user.setFirstname(firstname);
        }

        if (lastname != null &&
                !lastname.isEmpty() &&
                !user.getLastname().equals(lastname)) {
            user.setLastname(lastname);
        }


        if (username != null &&
                !username.isEmpty() &&
                !user.getUsername().equals(username)) {
            Optional<User> studentOptional = userRepository
                    .findUserByUsername(username);
            if (studentOptional.isPresent()) {
                throw new IllegalStateException("username taken");
            }
            user.setUsername(username);
        }

        if (restriction !=null &&
                !restriction.isEmpty()) {

        }

    }

    public void updateInventory(Long userId, FoodItemRequest foodItemRequest) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException("User with id " + userId + " does not exist"));

        UserInventory userInventory = user.getInventory();
        String removeItem = foodItemRequest.getRemoveItem();


        if (removeItem != null && removeItem.equals("True")) {
            DeleteFoodItem.deleteFoodItem(userInventory, foodItemRequest);
        } else {
            AddFoodItem.addFoodItem(userInventory, foodItemRequest);
        }

    }

    public void updateDietaryRestriction(Long userId, DietaryRestrictionRequest dietaryRestrictionRequest) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException("User with id " + userId + " does not exist"));
        String restriction = dietaryRestrictionRequest.getRestriction();
        Float value = Float.parseFloat(dietaryRestrictionRequest.getValue());

        UpdateRestriction.updateRestriction(user, restriction, value);
        userRepository.save(user);
        }
    }

