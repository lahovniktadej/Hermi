package com.example.demo.repositorys;

import org.springframework.data.repository.CrudRepository;

import com.example.demo.vao.User;

public interface UserRepository extends CrudRepository<User, Integer> {

}
