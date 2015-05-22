package com.hbin.mealorder.model.entity.order;

import java.util.Date;
import java.util.List;

import com.lifesense.framework.mybatis.entity.id.UUIDEntity;
import com.lifesense.framework.mybatis.interceptor.generatesql.annotation.Id;
import com.lifesense.framework.mybatis.interceptor.generatesql.annotation.Transient;

@SuppressWarnings("serial")
public class MealOrder implements UUIDEntity {

	@Id
	private String id;

	private Double total;

	private Integer status;

	private Date created;

	@Transient
	private List<MealOrderItem> items;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Double getTotal() {
		return total;
	}

	public void setTotal(Double total) {
		this.total = total;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Date getCreated() {
		return created;
	}

	public void setCreated(Date created) {
		this.created = created;
	}

	public List<MealOrderItem> getItems() {
		return items;
	}

	public void setItems(List<MealOrderItem> items) {
		this.items = items;
	}

	@Override
	public String toString() {
		return "MealOrder [id=" + id + ", total=" + total + ", status=" + status + ", created=" + created + ", items=" + items + "]";
	}

}
