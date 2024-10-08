package com.christophermarrella.cheffi.config;

import com.christophermarrella.cheffi.entities.UserInventory;
import com.christophermarrella.cheffi.entities.User;
import com.christophermarrella.cheffi.entities.UserDietaryPreferences;
import com.christophermarrella.cheffi.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;


@Configuration
public class UserConfig {

    @Bean
    CommandLineRunner commandLineRunner(
            UserRepository repository) {
        return args -> {
            User christopher = new User(1L,
                    "admin",
                    "admin",
                    "admin",
                    new UserDietaryPreferences()
            );

            repository.saveAll(
                    List.of(christopher)
            );
        };


    }
}
