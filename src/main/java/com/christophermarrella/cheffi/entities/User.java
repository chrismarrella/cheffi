package com.christophermarrella.cheffi.entities;

import com.christophermarrella.cheffi.entity_interfaces.DietaryPreferences;
import com.christophermarrella.cheffi.entity_interfaces.Inventory;
import jakarta.persistence.*;

import java.util.Map;


@Entity
@Table(name = "\"cheffi\"")
public class User {
    @Id
    @SequenceGenerator(
            name = "user_sequence",
            sequenceName = "user_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "user_sequence"
    )
    private Long id;
    private String username;
    private String firstname;
    private String lastname;
    @Embedded
    private UserDietaryPreferences dietaryRestrictions;
    @Embedded
    private UserInventory inventory;

    public User() {
    }

    public User(Long id, String username, String firstname, String lastname, UserDietaryPreferences dietaryRestrictions) {
        this.id = id;
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.dietaryRestrictions = dietaryRestrictions;
        this.inventory = new UserInventory();
    }

    public User(String username, String firstname, String lastname, UserDietaryPreferences dietaryRestrictions) {
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.dietaryRestrictions = dietaryRestrictions;
        this.inventory = new UserInventory();
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public void addRestriction(String restriction, Float res) {
        this.dietaryRestrictions.addRestriction(restriction, res);
    }

    public Boolean removeRestriction(String restriction, Float res) {
        return this.dietaryRestrictions.removeRestriction(restriction, res);
    }

    public Map<String, Float> getRestrictionMap() {
        return this.dietaryRestrictions.getRestrictionMap();
    }


    public void setDietaryRestrictions(Map<String, Float> dietaryRestrictions) {
        this.dietaryRestrictions.setDietaryRestrictions(dietaryRestrictions);
    }

    public Float getRestriction(String key) {
        return this.dietaryRestrictions.getRestriction(key);
    }

    public UserInventory getInventory() {
        return this.inventory;
    }

    public void setInventory(UserInventory inventory) {
        this.inventory = inventory;
    }



    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", first name='" + firstname + '\'' +
                ", last name='" + lastname + '\'' +
                ", dietary restrictions=" + dietaryRestrictions + '\'' +
                ", inventory=" + inventory + '\'' +
                '}';
    }
}
