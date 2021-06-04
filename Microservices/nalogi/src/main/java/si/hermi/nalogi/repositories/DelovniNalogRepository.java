package si.hermi.nalogi.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;
import si.hermi.nalogi.vao.DelovniNalog;

public interface DelovniNalogRepository extends PagingAndSortingRepository<DelovniNalog, Integer> {
}
