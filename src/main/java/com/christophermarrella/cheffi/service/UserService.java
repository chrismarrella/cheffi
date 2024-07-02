package com.christophermarrella.cheffi.service;

import com.christophermarrella.cheffi.model.User;
import com.christophermarrella.cheffi.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public void updateUser(Long userId, String username, String firstname, String lastname) {
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
    }
}

