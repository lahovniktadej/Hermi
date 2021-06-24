package si.hermi.nalogi.services;

import org.hibernate.Filter;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import si.hermi.nalogi.repositories.DelovniNalogRepository;
import si.hermi.nalogi.vao.DelovniNalog;

import javax.persistence.EntityManager;
import java.util.Optional;

@Service
public class DelovniNalogService {
    @Autowired
    private DelovniNalogRepository delovniNalogRepository;

    @Autowired
    private EntityManager entityManager;

    public DelovniNalog save(DelovniNalog delovniNalog) {
        return delovniNalogRepository.save(delovniNalog);
    }

    public void deleteById(int id) {
        delovniNalogRepository.deleteById(id);
    }

    public Iterable<DelovniNalog> findAll() {
        Session session = entityManager.unwrap(Session.class);
        Filter filter = session.enableFilter("deletedFilter");
        Iterable<DelovniNalog> delovniNalogi = delovniNalogRepository.findAll();
        session.disableFilter("deletedFilter");
        return delovniNalogi;
    }

    public Iterable<DelovniNalog> findAll(Pageable pageable) {
        Session session = entityManager.unwrap(Session.class);
        Filter filter = session.enableFilter("deletedFilter");
        Iterable<DelovniNalog> delovniNalogi = delovniNalogRepository.findAll(pageable);
        session.disableFilter("deletedFilter");
        return delovniNalogi;
    }

    public Optional<DelovniNalog> findById(int id) {
        return delovniNalogRepository.findById(id);
    }
}
