package si.hermi.nalogi.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import si.hermi.nalogi.dto.LoggerDto;
import si.hermi.nalogi.repositories.LoggerRepository;
import si.hermi.nalogi.vao.Logger;

import java.util.Optional;

@RestController
@RequestMapping("/logger")
public class LoggerController {
    @Autowired
    private LoggerRepository loggerRepository;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping(params = {"page", "perPage"})
    public Iterable<Logger> getPage(@RequestParam int page, @RequestParam int perPage) {
        return loggerRepository.findAll(PageRequest.of(page, perPage));
    }

    @GetMapping()
    public @ResponseBody Iterable<Logger> all() {
        return loggerRepository.findAll();
    }

    @PostMapping()
    public @ResponseBody ResponseEntity addLogger(@RequestBody LoggerDto loggerDto) {
        Logger log = modelMapper.map(loggerDto, Logger.class);
        loggerRepository.save(log);
        return ResponseEntity.ok().build();
    }
}
