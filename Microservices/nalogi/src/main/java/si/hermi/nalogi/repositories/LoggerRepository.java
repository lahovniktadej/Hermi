package si.hermi.nalogi.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;
import si.hermi.nalogi.vao.Logger;

public interface LoggerRepository extends PagingAndSortingRepository<Logger, Integer> {
}
