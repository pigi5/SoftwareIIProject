package petfinder.site.endpoint;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class NotAuthenticatedException extends Exception {
	private Exception parent;
	public NotAuthenticatedException(Exception parent) {
		this.parent = parent;
	}
	
	public Exception getParent() {
		return parent;
	}
	
	public ResponseEntity<String> getNewResponseEntity() {
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
	}
}
