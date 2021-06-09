package si.hermi.nalogi.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import si.hermi.nalogi.dto.EkipaDto;
import si.hermi.nalogi.repositories.EkipaRepository;
import si.hermi.nalogi.vao.Ekipa;

import java.util.Optional;

@RestController
@RequestMapping("/ekipa")
public class EkipaController {
    @Autowired
    EkipaRepository ekipaRepository;

    @Autowired
    ModelMapper modelMapper;

    @GetMapping()
    public Iterable<Ekipa> getAll() {
        return ekipaRepository.findAll();
    }

    @GetMapping(params = {"page", "perPage"})
    public Iterable<Ekipa> getPage(@RequestParam int page, @RequestParam int perPage) {
        return ekipaRepository.findAll(PageRequest.of(page, perPage));
    }

    @GetMapping("/{id}")
    public @ResponseBody ResponseEntity getEkipa(@PathVariable int id) {
        Optional<Ekipa> ekipaOpt = ekipaRepository.findById(id);
        if (ekipaOpt.isPresent()) {
            EkipaDto ekipaDto = modelMapper.map(ekipaOpt.get(), EkipaDto.class);
            return ResponseEntity.ok(ekipaDto);
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping()
    public @ResponseBody ResponseEntity addEkipa(@RequestBody EkipaDto ekipaDto) {
        Ekipa ekipa = modelMapper.map(ekipaDto, Ekipa.class);
        return ResponseEntity.ok(ekipaRepository.save(ekipa));
    }

    @PutMapping("/{id}")
    public @ResponseBody ResponseEntity updateEkipa(@PathVariable int id, @RequestBody EkipaDto ekipaDto) {
        Optional<Ekipa> ekipaOpt = ekipaRepository.findById(id);
        if (ekipaOpt.isPresent()) {
            Ekipa ekipa = ekipaOpt.get();
            modelMapper.map(ekipaDto, ekipa);
            return ResponseEntity.ok(ekipaRepository.save(ekipa));
        }
        return ResponseEntity.badRequest().build();
    }

    @DeleteMapping("/{id}")
    public @ResponseBody ResponseEntity deleteEkipa(@PathVariable int id) {
        ekipaRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
