package si.hermi.nalogi.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import si.hermi.nalogi.dto.DelovniNalogDto;
import si.hermi.nalogi.repositories.DelovniNalogRepository;
import si.hermi.nalogi.vao.DelovniNalog;

@RestController
@RequestMapping("/delovniNalog")
public class DelovniNalogController {
    @Autowired
    DelovniNalogRepository delovniNalogRepository;

    @Autowired
    ModelMapper modelMapper;

    @GetMapping()
    public Iterable<DelovniNalog> getAll() {
        return delovniNalogRepository.findAll();
    }

    @PostMapping()
    public @ResponseBody ResponseEntity addNalog(@RequestBody DelovniNalogDto delovniNalogDto) {
        DelovniNalog delovniNalog = modelMapper.map(delovniNalogDto, DelovniNalog.class);
        delovniNalogRepository.save(delovniNalog);
        return ResponseEntity.ok().build();
    }
}
