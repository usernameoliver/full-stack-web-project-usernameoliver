package edu.washington.cs.figer.ml;

import edu.washington.cs.figer.data.DataSet;

import java.io.Serializable;

public abstract class Learner implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -600512262908205095L;
	public Model m = null;

	public abstract void learn(DataSet data, Model m);

}
