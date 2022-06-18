using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;


public class PlayerMovement : MonoBehaviour
{
    public Rigidbody rb;
    public Transform Rotate;
    public float staticForce = 10000f;
    public float upForce = 10000f;
    public float MoveForce = 1000f;
    // public float frameFix = Time.deltaTime;

    // Start is called before the first frame update
    void Start()
    {
        //Debug.Log("Hello");
        
    }

    // Update is called once per frame
    void Update()
    {
        // rb.AddForce(200*Time.deltaTime, 0, 0);

    }
    void FixedUpdate()
    {
        //rb.AddForce(0, -staticForce*Time.deltaTime, 0);
        Rotate.Rotate(0, 0, 0);
        //fly on pressing upward key 
        // if (Input.GetKey("w"))
        if (Input.GetKey(KeyCode.RightArrow))
    {

        //Debug.Log("Up");
        rb.AddForce(MoveForce * Time.deltaTime, upForce*Time.deltaTime,0);
            Rotate.Rotate(0,0,0);
                
    }

    if (Input.GetKey(KeyCode.LeftArrow))
    {
        //Debug.Log("Back");
            rb.AddForce(-MoveForce * Time.deltaTime, upForce * Time.deltaTime, 0);
    }

    }

}
