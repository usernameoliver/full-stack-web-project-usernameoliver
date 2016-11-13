package edu.washington.nsre.extraction;

import com.google.common.collect.HashMultimap;

import java.util.HashMap;

public class Stat {
	HashMap<String, Eec> eecname2eec;
	HashMultimap<String, Tuple> phrase2tuples;
}
