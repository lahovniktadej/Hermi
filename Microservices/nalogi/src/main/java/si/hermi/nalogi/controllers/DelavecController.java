package si.hermi.nalogi.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import si.hermi.nalogi.dto.DelavecDto;
import si.hermi.nalogi.repositories.DelavecRepository;
import si.hermi.nalogi.vao.Delavec;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/delavec")
public class DelavecController {
    @Autowired
    private DelavecRepository delavecRepository;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping()
    public @ResponseBody Iterable<DelavecDto> all() {
        Iterable<Delavec> delavci = delavecRepository.findAll();
        List<DelavecDto> delaveciDto = new ArrayList<>();
        for (Delavec delavec: delavci) {
            delaveciDto.add(modelMapper.map(delavec, DelavecDto.class));
        }
        return delaveciDto;
    }

    @PostMapping()
    public @ResponseBody ResponseEntity addDelavec(@RequestBody DelavecDto delavecDto) {
        Delavec delavec = modelMapper.map(delavecDto, Delavec.class);
        delavecRepository.save(delavec);
        return ResponseEntity.ok().build();
    }

    /*
    @PutMapping("/{id}")
    public @ResponseBody ResponseEntity updateDelavec(@PathVariable int id, @RequestBody DelavecDto delavecDto) {
        Optional<Delavec> delavec = delavecRepository.findById(id);
        if (delavec.isPresent()) {
            Delavec updated = modelMapper.map(delavecDto, Delavec.class);
            updated.setId(id);
            delavecRepository.save(updated);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }
    */
}
