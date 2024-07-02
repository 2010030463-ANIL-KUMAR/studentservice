package com.example.studentservice.repository;

import com.example.studentservice.model.ClassData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClassDataRepository extends JpaRepository<ClassData, Long> {
}
