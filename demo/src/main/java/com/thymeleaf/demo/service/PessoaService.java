package com.thymeleaf.demo.service;
import org.springframework.stereotype.Service;
import com.thymeleaf.demo.repository.PessoaRepository;
import com.thymeleaf.demo.model.Pessoa;
import java.util.List;
import java.util.Optional;

@Service
public class PessoaService{

    private final PessoaRepository pessoaRepository;

    public PessoaService(PessoaRepository pessoaRepository){
        this.pessoaRepository = pessoaRepository;
    }
    public List<Pessoa> listarPessoas(){
        return pessoaRepository.findAll();
    }

    public Optional<Pessoa> buscarPorId(Integer id){
        return pessoaRepository.findById(id);
    }

    public Pessoa salvarPessoa(Pessoa pessoa){
        return pessoaRepository.save(pessoa);
    }

    public void deletarPessoa(Integer id){
        pessoaRepository.deleteById(id);
    }
}
