package com.christophermarrella.cheffi.repository;

import com.christophermarrella.cheffi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT u FROM User u WHERE u.lastname = ?1")
    Optional<User> findUserByLastname(String lastname);
}

