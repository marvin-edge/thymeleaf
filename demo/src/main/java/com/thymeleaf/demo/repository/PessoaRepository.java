package com.thymeleaf.demo.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.thymeleaf.demo.model.Pessoa;

public interface PessoaRepository extends JpaRepository<Pessoa, Integer> {
}
