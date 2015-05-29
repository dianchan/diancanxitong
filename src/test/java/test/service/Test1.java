package test.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Test;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.hbin.util.HttpClientManager;
import com.lifesense.framework.common.jackson.JacksonUtils;

public class Test1 {

	@Test
	public void testGetAll() throws JsonProcessingException, InterruptedException {
		// {"customerId":"0927",
		// "operatorId":"502",
		// "items":[{"productId":"3","quantity":"2"},{"productId":"1","quantity":"1"}]
		// }

		String json = getJson();

		List<Thread> threads = new ArrayList<>();
		
		for (int i = 0; i < 50; i++) {
			Thread t = new Thread(() -> {
				for (int j=0;;j++) {
					String result = HttpClientManager.postJson("http://192.168.22.20/orderTest/order/add", json);
					System.out.println(j + "[" + System.currentTimeMillis() + "]" + result);
				}
			});
			t.start();
			threads.add(t);
		}
		
		threads.forEach(t->{
			try {
				t.join();
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		});

	}

	private String getJson() throws JsonProcessingException {
		Map<String, Object> obj = new HashMap<>();
		obj.put("customerId", "0927");
		obj.put("operatorId", "502");

		List<Map<String, String>> items = new ArrayList<>();

		Map<String, String> item1 = new HashMap<>();
		item1.put("productId", "3");
		item1.put("quantity", "2");
		items.add(item1);

		Map<String, String> item2 = new HashMap<>();
		item2.put("productId", "1");
		item2.put("quantity", "1");
		items.add(item2);

		obj.put("items", items);

		String json = JacksonUtils.toJson(obj);

		return json;
	}
}
